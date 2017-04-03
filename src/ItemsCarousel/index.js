import React from 'react';
import { Motion, spring } from 'react-motion';
import Measure from 'react-measure';
import styled from 'styled-components';
import Animator from './Animator';

const SliderWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const SliderItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  transform: translate(${(props) => props.translateX}px, 0);
`;

const SliderInnerWrapper = styled.div`
  padding-left: ${(props) => props.firstItemGutter}px;
  padding-right: ${(props) => props.lastItemGutter}px;
`;

const SliderItem = styled.div`
  width: ${(props) => props.width}px;
  flex-shrink: 0;
  margin-right: ${(props) => props.rightGutter}px;
  margin-left: ${(props) => props.leftGutter}px;
`;

export default class ItemsCarousel extends React.Component {
  static propTypes = {
    /**
     * Use this to control the resistance when the user release the swipe
     * More resistance means the slider will take shorter path to stop
     * @type {number}
     */
    resistanceCoeffiecent: React.PropTypes.number,
    stiffness: React.PropTypes.number,
    damping: React.PropTypes.number,
    children: React.PropTypes.array.isRequired,
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
  };

  static defaultProps = {
    resistanceCoeffiecent: 0.5,
    stiffness: 270,
    damping: 30,
    gutter: 0,
    safeMargin: 100,
    initialTranslation: 0,
    numberOfCards: 3.5,
    firstItemGutter: 0,
    lastItemGutter: 0,
    centeredItemIndex: 0,
    canCenterOne: true,
  };

  constructor(props) {
    super(props);

    this.animator = new Animator();
    this.animator.setCurrentTranslateX(0);
    this.updateAnimatorFromProps(props);

    this.state = {
      translateX: 0,
      centeredItemIndex: 0,
    };

    if(this.props.centeredItemIndex) {
      this.animator.whenReady(() => {
        this.setState(this.getCenterItemState(this.props.centeredItemIndex));
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.updateAnimatorFromProps(nextProps);

    if(nextProps.centeredItemIndex !== this.state.centeredItemIndex) {
      this.centerItem(nextProps.centeredItemIndex);
    }
  }

  updateAnimatorFromProps(props) {
    this.animator.setNumberOfChildren(props.children.length);
    this.animator.setNumberOfCards(props.numberOfCards);
    this.animator.setGutter(props.gutter);
    this.animator.setSafeMargin(props.safeMargin);
    this.animator.setInitialTranslation(props.initialTranslation);
    this.animator.setResistanceCoeffiecent(props.resistanceCoeffiecent);
    this.animator.setCanCenterOne(props.canCenterOne);
  }

  componentWillUpdate(nextProps, nextState) {
    if(nextState.translateX !== this.state.translateX) {
      this.animator.setCurrentTranslateX(nextState.translateX);
    }

    if(nextProps.onCenteredItemChange && 
      nextState.centeredItemIndex !== this.state.centeredItemIndex) {
      nextProps.onCenteredItemChange(nextState.centeredItemIndex);
    }
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

    this.setState({
      startSwipe: { posX, posY },
    });
  }

  onSwipeEnd = () => {
    const deltaX = this.state.lastSwipe.posX - this.state.startSwipe.posX;
    this.animator.endDrag();

    const centeredItemIndex = this.animator.getSwipeReleaseCenterItemIndex(deltaX);

    // 
    this.setState({
      translateX: this.animator.calculateCenterTranslateXAtItem(centeredItemIndex),
      centeredItemIndex,
    });
  }

  onSwipe = (e) => {
    const { posX, posY } = this.getPosition(e);
    const deltaX = posX - this.state.startSwipe.posX;

    this.setState({
      translateX: this.animator.calculateSwipeTranslateX(deltaX),
      lastSwipe: { posX, posY },
    });
  }

  getInitialFrame() {
    return {
      translateX: this.state.translateX,
    };
  }

  calculateNextFrame() {
    const options = {
      stiffness: this.props.stiffness,
      damping: this.props.damping,
    };
    return {
      translateX: spring(this.state.translateX, options),
    };
  }

  renderList(translateX, gutter, children) {
    return (
      <SliderItemsWrapper translateX={translateX}>
        {children.map((child, index) => (
          <Measure
            key={index}
            includeMargin={false}
            onMeasure={({ width }) => {
              if(width > 20) {
                this.animator.setChildWidth(index, width);
                this.setState({ update: true });
              }
            }}
          >
            <SliderItem
              width={this.animator.getItemWidth()}
              rightGutter={index === children.length - 1 ? 0 : gutter}
            >
              {child}
            </SliderItem>
          </Measure>
        ))}
      </SliderItemsWrapper>
    );
  }

  render() {
    const {
      gutter,
      children,
      firstItemGutter,
      lastItemGutter,
      ...props,
    } = this.props;

    return (
      <SliderWrapper
        onTouchEnd={this.onSwipeEnd}
        onTouchMove={this.onSwipe}
        onTouchStart={this.onSwipeStart}
      >
        <SliderInnerWrapper
          firstItemGutter={firstItemGutter}
          lastItemGutter={lastItemGutter}
        >
          <Measure
            onMeasure={({ width }) => {
              this.animator.setContainerWidth(width);
              this.setState({ update: true });
            }}
          >
            <Motion
              onRest={() => {
              }}
              defaultStyle={this.getInitialFrame()}
              style={this.calculateNextFrame()}
            >
              {({ translateX }) =>
                this.renderList(translateX, gutter, children)}
            </Motion>
          </Measure>
        </SliderInnerWrapper>
      </SliderWrapper>
    );
  }
}
