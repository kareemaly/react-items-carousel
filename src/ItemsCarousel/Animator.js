import { calculateNextDistance } from './math';

const getCurrentMillis = () => new Date().getTime();

export default class Animator {
  constructor() {
    this.children = [];
    this.readyListeners = [];
    this.noOfChildren = 0;
  }

  setChildrenWidth(childrenWidth) {
    this.childrenWidth = childrenWidth;
  }

  setContainerWidth(containerWidth) {
    this.containerWidth = containerWidth;
  }

  getContainerWidth() {
    return this.containerWidth;
  }

  setSafeMargin(safeMargin) {
    this.safeMargin = safeMargin;
  }

  setInitialTranslation(initialTranslation) {
    this.initialTranslation = initialTranslation;
  }

  setResistanceCoeffiecent(resistanceCoeffiecent) {
    this.resistanceCoeffiecent = resistanceCoeffiecent;
  }

  setCurrentTranslateX(translateX) {
    this.currentTranslateX = translateX;
  }

  startDrag() {
    this.startDragMillis = getCurrentMillis();
    this.startTranslateX = this.currentTranslateX;
  }

  endDrag() {
    this.endDragMillis = getCurrentMillis();
  }

  /**
   * Return true if the list has gone far left
   * @return {Boolean}
   */
  isFarLeft(translateX, useSafeMargin = false) {
    return translateX > (useSafeMargin ? this.safeMargin : 0);
  }

  /**
   * Return true if the list has gone far right
   * @param  {Boolean} useSafeMargin
   * @return {Boolean}
   */
  isFarRight(translateX, useSafeMargin = false) {
    const safeMargin = useSafeMargin ? this.safeMargin : 0;

    // If the newtranslate + window width is more than list width then stop translating
    return (translateX * -1) + this.containerWidth > (this.childrenWidth + safeMargin);
  }

  isChildrenSmallerThanContainer() {
    return this.childrenWidth < this.containerWidth;
  }

  getFarLeftTranslation(useSafeMargin) {
    return this.initialTranslation + 0 + (useSafeMargin ? this.safeMargin : 0);
  }

  getFarRightTranslation(useSafeMargin) {
    return this.initialTranslation - this.childrenWidth + this.containerWidth - (useSafeMargin ? this.safeMargin : 0);
  }

  checkAndGetTranslateX(translateX, useSafeMargin) {
    if(this.isFarLeft(translateX, useSafeMargin)) {
      return this.getFarLeftTranslation(useSafeMargin);
    }

    if(this.isFarRight(translateX, useSafeMargin)) {
      return this.getFarRightTranslation(useSafeMargin);
    }

    return translateX;
  }

  calculateSwipeNextDistance(deltaX) {
    return calculateNextDistance({
      deltaX,
      startDragMillis: this.startDragMillis,
      endDragMillis: this.endDragMillis,
      resistanceCoeffiecent: this.resistanceCoeffiecent,
    });
  }

  calculateSwipeReleaseTranslateX(deltaX) {
    this.check();
    if(this.isChildrenSmallerThanContainer()) {
      return this.initialTranslation;
    }
    const distance = this.calculateSwipeNextDistance(deltaX);
    return this.checkAndGetTranslateX(distance + this.currentTranslateX, false);
  }

  calculateSwipeTranslateX(deltaX) {
    this.check();
    if(this.isChildrenSmallerThanContainer()) {
      return this.initialTranslation;
    }
    return this.checkAndGetTranslateX(deltaX + this.startTranslateX, true);
  }

  check() {
    if(this.safeMargin === undefined) throw new Error(`You have to set safeMargin for the animator`);
    if(this.initialTranslation === undefined) throw new Error(`You have to set initialTranslation for the animator`);
    if(this.resistanceCoeffiecent === undefined) throw new Error(`You have to set resistanceCoeffiecent for the animator`);
    if(this.currentTranslateX === undefined) throw new Error(`You have to set currentTranslateX for the animator`);
  }

  setNumberOfChildren(noOfChildren) {
    this.noOfChildren = noOfChildren;
  }

  whenReady(callback) {
    this.readyListeners.push(callback);
  }

  callReadyListeners() {
    this.readyListeners.forEach(listener => listener());
    this.readyListeners = [];
  }

  setGutter(gutter) {
    this.gutter = gutter;
  }

  setCanCenterOne(canCenterOne) {
    this.canCenterOne = canCenterOne;
  }

  setNumberOfCards(noOfCards) {
    this.noOfCards = noOfCards;
  }

  setChildWidth(index, childWidth) {
    this.children[index] = childWidth;

    const totalChildrenWidth = this.children.reduce((a, b) => a + b, 0);

    this.setChildrenWidth(totalChildrenWidth + (this.gutter * (this.children.length - 1)));

    if(index === this.noOfChildren - 1) {
      this.callReadyListeners();
    }
  }

  getItemWidth() {
    const allGutter = this.gutter * (this.noOfCards - 1);
    const itemWidth = (this.getContainerWidth() - allGutter)  / this.noOfCards;
    return Math.floor(itemWidth);
  }

  getCenterPointAt(n) {
    // Pn = In+1 + In + In-1 + In-2 + ... + gutter*n + gutter/2
    // where n starts from 0
    // Pn = pointToCenter
    // In = width of item at n
    const totalItemsWidth = this.children.slice(0, n + 1).reduce((a, b) => a + b, 0);
    return totalItemsWidth + (this.gutter*n) + (this.gutter/2);
  }

  getItemCenterAt(n) {
    // Cn = In + In-1 + In-2 + ... + In+1/2 + gutter*n
    // where n starts from 0
    // Cn = center of an item
    // In = width of item at n
    const totalItemsWidth = this.children.slice(0, n).reduce((a, b) => a + b, 0);

    // If it's the last item
    if((this.children.length - 1) <=  n) {
      return this.childrenWidth;
    }

    return totalItemsWidth + (this.gutter*n) + (this.children[n + 1]/2);
  }

  calculateCenterTranslateXAtItem(n) {
    const nextCenter = (this.containerWidth/2) - (
      this.shouldntCenterOneItem() ? this.getCenterPointAt(n) : this.getItemCenterAt(n));

    return this.checkAndGetTranslateX(nextCenter, false);
  }

  shouldntCenterOneItem() {
    if(this.canCenterOne) {
      // Get width of two items and check if they are smaller than container width
      const twoItemsWidth = this.children.slice(0, 2).reduce((a, b) => a + b, 0) + this.gutter;
      return twoItemsWidth < this.containerWidth;
    }
    return true;
  }

  getCenterItemIndex(releaseTranslateX, isSwippingRight) {
    let nextCenter;

    const calculateCenter = (i) => (this.containerWidth/2) - (
      this.shouldntCenterOneItem() ? this.getCenterPointAt(i) : this.getItemCenterAt(i));

    if(isSwippingRight) {
      // Loop until you get the next point at right
      for (var i = 0; i < this.children.length; i++) {
        nextCenter = calculateCenter(i);

        if(nextCenter < releaseTranslateX) {
          return i;
        }
      }
    } else {
      // Loop until you get the previous point at left
      for (var i = this.children.length - 1; i >= 0; i--) {
        nextCenter = calculateCenter(i);

        if(nextCenter > releaseTranslateX) {
          return i;
        }
      }
    }

    throw new Error("Cant getCenterItemIndex");
  }

  getSwipeReleaseCenterItemIndex(deltaX) {
    const releaseTranslateX = this.calculateSwipeReleaseTranslateX(deltaX);

    if(releaseTranslateX === this.initialTranslation) {
      return 0;
    }

    const isSwippingRight = deltaX < 0;

    return this.getCenterItemIndex(releaseTranslateX, isSwippingRight);
  }
}