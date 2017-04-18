import React from 'react';
import { Motion, spring, presets } from 'react-motion';
import Measure from 'react-measure';
import styled, { injectGlobal } from 'styled-components';
import range from 'lodash/range';
import Animator from './Animator';
import ItemsCarouselList from './ItemsCarouselList';

const ChevronsWrapper = styled.div`
  ${(props) => props.hasChevron ? `position: relative`: ''}
`;

const SliderWrapper = styled.div`
  width: 100%;
  overflow-x: ${(props) => !props.isAppShellMode && !props.disableScrolling && props.freeScrolling ? 'scroll' : 'hidden'};
  -webkit-overflow-scrolling: touch;
  ::-webkit-scrollbar {
    display: none;
    width: 0px;
    background: rgba(0, 0, 0, 0);
  }
`;

const SliderInnerWrapper = styled.div`
  margin-left: ${(props) => props.firstItemGutter}px;
  margin-right: ${(props) => props.lastItemGutter}px;
`;

const CarouselRightChevron = styled.div`
  position: absolute;
  height: 100%;
  width: ${(props) => props.chevronWidth + 1}px;
  cursor: pointer;
  background: #FFF;
  right: -${(props) => props.outsideChevron ? props.chevronWidth + 1 : 1}px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselLeftChevron = styled(CarouselRightChevron)`
  left: -${(props) => props.outsideChevron ? props.chevronWidth + 1 : 1}px;
  right: 0px;
`;

export default class ItemsCarousel extends React.Component {
  static propTypes = {
    /**
     * Use this to control the resistance when the user release the swipe
     * More resistance means the slider will take shorter path to stop
     * @type {number}
     */
    resistanceCoeffiecent: React.PropTypes.number,
    springConfig: React.PropTypes.shape({
      stiffness: React.PropTypes.number,
      precision: React.PropTypes.number,
      damping: React.PropTypes.number,
    }),
    children: React.PropTypes.array.isRequired,
    disableScrolling: React.PropTypes.bool,
    freeScrolling: React.PropTypes.bool,
    /**
     * Safe margin to use
     * @type {number}
     */
    safeMargin: React.PropTypes.number,
    /**
     * Gutter between items
     * @type {number}
     */
    gutter: React.PropTypes.number,
    /**
     * This is particallary not useful
     * @ignore
     * @type {number}
     */
    initialTranslation: React.PropTypes.number,
    /**
     * Define the number of cards to show
     * @type {number}
     */
    numberOfCards: React.PropTypes.number,
    /**
     * Define the gutter of the first item
     * @type {number}
     */
    firstItemGutter: React.PropTypes.number,
    /**
     * Define the gutter of the last item
     * @type {number}
     */
    lastItemGutter: React.PropTypes.number,
    /**
     * This gives control to change the centeredItemIndex from outside
     * If this is given then you should update it by listening onCenteredItemChange
     * @type {number}
     */
    centeredItemIndex: React.PropTypes.number,
    /**
     * This is called when the centered item index change
     * @type {func}
     */
    onCenteredItemChange: React.PropTypes.func,
    /**
     * If this is true then when two items are greater than the container width then
     * it will center one item
     * @type {bool}
     */
    canCenterOne: React.PropTypes.bool,

    // AppShell configurations
    enableAppShell: React.PropTypes.bool,
    appShellItem: React.PropTypes.element,
    minimumAppShellTime: React.PropTypes.number,
    numberOfShellItems: React.PropTypes.number,

    // Chevron configurations
    rightChevron: React.PropTypes.element,
    leftChevron: React.PropTypes.element,
    chevronWidth: React.PropTypes.number,
    outsideChevron: React.PropTypes.bool,
    // Number of slides to scroll when chevron is clicked
    slidesToScroll:  React.PropTypes.number,
  };

  static defaultProps = {
    resistanceCoeffiecent: 0.5,
    springConfig: presets.noWobble,
    gutter: 0,
    safeMargin: 100,
    initialTranslation: 0,
    numberOfCards: 3.5,
    firstItemGutter: 0,
    lastItemGutter: 0,
    centeredItemIndex: 0,
    canCenterOne: true,
    enableAppShell: true,
    minimumAppShellTime: 0,
    numberOfShellItems: 4,
  };

  constructor(props) {
    super(props);

    this.animator = new Animator();
    this.appShellAnimator = new Animator();

    this.updateAnimatorFromProps(props, this.animator);
    this.updateAnimatorFromProps(props, this.appShellAnimator);

    const hasMinimumAppShellTime = props.enableAppShell && props.children.length === 0 && props.minimumAppShellTime > 0;

    this.state = {
      translateX: 0,
      centeredItemIndex: 0,
      isReady: false,
      lastSwipe: {},
      startSwipe: {},
      // Force show app shell if minimum app shell time was greater than zero
      forceShowAppShell: hasMinimumAppShellTime,
    };

    // Add timer to unset forceShowAppShell state variable after the minimum app shell time
    if(hasMinimumAppShellTime) {
      this.timer = setTimeout(() => {
        this.setState({
          forceShowAppShell: false,
        });
      }, this.props.minimumAppShellTime);
    }

    // When animator says that children are ready (there widths have been calculated)
    this.animator.whenReady(() => {
      this.setState({
        isReady: true,
        ...this.getCenterItemState(this.props.centeredItemIndex)
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateAnimatorFromProps(nextProps, this.animator);
    this.updateAnimatorFromProps(nextProps, this.appShellAnimator);

    if(! this.isAppShellMode(nextProps, this.state)
      && nextProps.centeredItemIndex !== this.state.centeredItemIndex) {
      this.centerItem(nextProps.centeredItemIndex);
    }
  }

  updateAnimatorFromProps(props, animator) {
    animator.setNumberOfChildren(props.children.length);
    animator.setNumberOfCards(props.numberOfCards);
    animator.setGutter(props.gutter);
    animator.setSafeMargin(props.safeMargin);
    animator.setInitialTranslation(props.initialTranslation);
    animator.setResistanceCoeffiecent(props.resistanceCoeffiecent);
    animator.setCanCenterOne(props.canCenterOne);
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextProps.onCenteredItemChange && 
      nextState.centeredItemIndex !== this.state.centeredItemIndex) {
      nextProps.onCenteredItemChange(nextState.centeredItemIndex);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  getPosition(e) {
    const posX = (e.touches !== undefined && e.touches[0]) ? e.touches[0].pageX : e.clientX;
    const posY = (e.touches !== undefined && e.touches[0]) ? e.touches[0].pageY : e.clientY;

    return { posX, posY };    
  }

  getCenterItemState(index) {
    return {
      translateX: this.animator.calculateCenterTranslateXAtItem(index),
      centeredItemIndex: index,
    };
  }

  centerItem(index) {
    this.setState(this.getCenterItemState(index));
  }

  onSwipeStart = (e) => {
    this.animator.startDrag();

    const { posX, posY } = this.getPosition(e);

    window.requestAnimationFrame(() => {
      this.setState({
        startSwipe: { posX, posY },
      });
    });
  }

  onSwipeEnd = () => {
    const deltaX = this.state.lastSwipe.posX - this.state.startSwipe.posX;
    this.animator.endDrag();

    const centeredItemIndex = this.animator.getSwipeReleaseCenterItemIndex(deltaX);

    // 
    window.requestAnimationFrame(() => {
      this.setState({
        translateX: this.animator.calculateCenterTranslateXAtItem(centeredItemIndex),
        centeredItemIndex,
      });
    });
  }

  onSwipe = (e) => {
    const { posX, posY } = this.getPosition(e);
    const deltaX = posX - this.state.startSwipe.posX;

    window.requestAnimationFrame(() => {
      this.setState({
        translateX: this.animator.calculateSwipeTranslateX(deltaX),
        lastSwipe: { posX, posY },
      });
    });
  }

  getInitialFrame() {
    return {
      translateX: this.state.translateX,
    };
  }

  calculateNextFrame() {
    return {
      translateX: spring(this.state.translateX, this.props.springConfig),
    };
  }

  renderList = ({ translateX }) => {
    const {
      gutter,
      freeScrolling,
      lastItemGutter,
      children,
      appShellItem,
      numberOfShellItems,
      enableAppShell,
    } = this.props;

    const {
      isReady,
      forceShowAppShell,
    } = this.state;

    const isAppShellMode = this.isAppShellMode({ enableAppShell, children }, { forceShowAppShell });
    const animator = isAppShellMode ? this.appShellAnimator : this.animator;
    const items = isAppShellMode ? range(numberOfShellItems).map(i => appShellItem) : children;

    animator.setCurrentTranslateX(translateX);

    // Need to add last item gutter when it's free scrolling and children smaller than container
    const freeScrollingLastItemGutter = freeScrolling && !animator.isChildrenSmallerThanContainer() ? lastItemGutter : 0;

    return (
      <ItemsCarouselList
        translateX={translateX}
        freeScrollingLastItemGutter={freeScrollingLastItemGutter}
        gutter={gutter}
        isReady={isReady}
        animator={animator}
        children={items}
      />
    );
  }

  isAppShellMode({ enableAppShell, children }, { forceShowAppShell }) {
    return enableAppShell && (children.length === 0 || forceShowAppShell);
  }

  getLimitIndex(index, children) {
    if(index < 0) {
      return 0;
    }
    if(index > children.length - 1) {
      return children.length - 1;
    }
    return index;
  }

  render() {
    const {
      gutter,
      children,
      firstItemGutter,
      lastItemGutter,
      disableScrolling,
      freeScrolling,
      enableAppShell,
      numberOfCards,
      rightChevron,
      leftChevron,
      chevronWidth,
      outsideChevron,
      style,
      className,
      slidesToScroll,
      ...props,
    } = this.props;

    const {
      forceShowAppShell,
      centeredItemIndex,
    } = this.state;

    const isAppShellMode = this.isAppShellMode({ enableAppShell, children }, { forceShowAppShell });

    const showRightChevron = !isAppShellMode && rightChevron && centeredItemIndex < children.length - 1;
    const showLeftChevron = !isAppShellMode && leftChevron && centeredItemIndex > 0;

    const numberOfSlidesToScroll = slidesToScroll || numberOfCards;

    return (
      <ChevronsWrapper
        style={style}
        className={className}
        hasChevron={showLeftChevron || showRightChevron}
      >
        <SliderWrapper
          isAppShellMode={isAppShellMode}
          disableScrolling={disableScrolling}
          freeScrolling={freeScrolling}
          onTouchEnd={freeScrolling || disableScrolling ? undefined : this.onSwipeEnd}
          onTouchMove={freeScrolling || disableScrolling ? undefined : this.onSwipe}
          onTouchStart={freeScrolling || disableScrolling ? undefined : this.onSwipeStart}
        >
          <SliderInnerWrapper
            firstItemGutter={firstItemGutter}
            lastItemGutter={lastItemGutter}
          >
            <Measure
              whitelist={['width']}
              onMeasure={({ width }) => {
                this.animator.setContainerWidth(width);
                this.appShellAnimator.setContainerWidth(width);
                this.setState({ update: true });
              }}
            >
              <Motion
                defaultStyle={this.getInitialFrame()}
                style={this.calculateNextFrame()}
                children={this.renderList}
              />
            </Measure>
          </SliderInnerWrapper>
        </SliderWrapper>
        {
          showRightChevron && 
          <CarouselRightChevron
            chevronWidth={chevronWidth}
            outsideChevron={outsideChevron}
            onClick={() => this.centerItem(this.getLimitIndex(centeredItemIndex + numberOfSlidesToScroll, children))}
          >
            {rightChevron}
          </CarouselRightChevron>
        }
        {
          showLeftChevron && 
          <CarouselLeftChevron
            chevronWidth={chevronWidth}
            outsideChevron={outsideChevron}
            onClick={() => this.centerItem(this.getLimitIndex(centeredItemIndex - numberOfSlidesToScroll, children))}
          >
            {leftChevron}
          </CarouselLeftChevron>
        }
      </ChevronsWrapper>
    );
  }
}
