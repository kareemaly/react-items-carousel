import React from 'react';
import { Motion, spring } from 'react-motion';
import PropTypes from 'prop-types';
import userPropTypes from './userPropTypes';
import {
  calculateItemWidth,
  calculateItemLeftGutter,
  calculateItemRightGutter,
  showLeftChevron,
  showRightChevron,
  calculateNextIndex,
  calculatePreviousIndex,
} from './helpers';

const getCarouselWrapperStyle = () => ({
  position: 'relative',
});

const getWrapperStyle = () => ({
  width: '100%',
  overflowX: 'hidden',
});

const getSliderItemsWrapperStyle = ({ translateX }) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'nowrap',
  transform: `translateX(${translateX * -1}px)`
})

const getSliderItemStyle = ({ width, rightGutter, leftGutter }) => ({
  width,
  flexShrink: 0,
  marginRight: rightGutter,
  marginLeft: leftGutter,
});

const getCarouselChevronStyle = (chevronWidth) => ({
  position: 'absolute',
  height: '100%',
  width: chevronWidth + 1,
  cursor: 'pointer',
  top: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const getCarouselRightChevronStyle = ({ chevronWidth, outsideChevron }) => ({
  ...getCarouselChevronStyle(chevronWidth),
  right: outsideChevron ? -1 * chevronWidth : 0,
});

const getCarouselLeftChevronStyle = ({ chevronWidth, outsideChevron }) => ({
  ...getCarouselChevronStyle(chevronWidth),
  left: outsideChevron ? -1 * chevronWidth : 0,
});

class ItemsCarouselBase extends React.Component {
  componentDidUpdate(prevProps) {
    if (
      this.props.onActiveStateChange &&
      this.props.activeItemIndex !== prevProps.activeItemIndex
    ) {
      this.props.onActiveStateChange({
        ...this.getScrollState(),
      })
    }
  }

  getScrollState = () => {
    let {
      numberOfCards,
      activeItemIndex,
      activePosition,
      slidesToScroll,
      items,
    } = this.props;

    return {
      isLastScroll: !showRightChevron({
        activeItemIndex,
        activePosition,
        numberOfChildren: items.length,
        numberOfCards,
        slidesToScroll,
      }),
      isFirstScroll: !showLeftChevron({
        activeItemIndex,
        activePosition,
        numberOfChildren: items.length,
        numberOfCards,
        slidesToScroll,
      })
    }
  };

  renderList({ items, translateX, containerWidth, measureRef }) {
    const {
      gutter,
      numberOfCards,
      firstAndLastGutter,
      showSlither,
      classes,
      calculateActualTranslateX,
    } = this.props;

    return (
      <div style={getWrapperStyle()} className={classes.itemsWrapper}>
        <div
          ref={measureRef}
          style={getSliderItemsWrapperStyle({
            translateX: calculateActualTranslateX(translateX),
          })}
          className={classes.itemsInnerWrapper}
        >
          {items.map((child, index) => (
            <div
              key={index}
              style={getSliderItemStyle({
                width: calculateItemWidth({
                  firstAndLastGutter,
                  containerWidth,
                  gutter,
                  numberOfCards,
                  showSlither,
                }),
                leftGutter: calculateItemLeftGutter({
                  index,
                  firstAndLastGutter,
                  gutter,
                }),
                rightGutter: calculateItemRightGutter({
                  index,
                  firstAndLastGutter,
                  gutter,
                  numberOfChildren: items.length,
                }),
              })}
              className={classes.itemWrapper}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    let {
      // Props coming from withContainerWidth
      containerWidth,
      measureRef,
      // Props coming from withSwipe
      touchRelativeX,
      onWrapperTouchStart,
      onWrapperTouchEnd,
      onWrapperTouchMove,
      // Props coming from user
      gutter,
      numberOfCards,
      firstAndLastGutter,
      activePosition,
      springConfig,
      showSlither,
      rightChevron,
      leftChevron,
      chevronWidth,
      outsideChevron,
      requestToChangeActive,
      slidesToScroll,
      alwaysShowChevrons,
      classes,
      items,
      activeItemTranslateX,
      nextItemIndex,
      previousItemIndex,
    } = this.props;

    const {
      isFirstScroll,
      isLastScroll,
    } = this.getScrollState();
    const _showRightChevron = rightChevron && (alwaysShowChevrons || !isLastScroll);
    const _showLeftChevron = leftChevron && (alwaysShowChevrons || !isFirstScroll);

    return (
      <div
        style={getCarouselWrapperStyle()}
        onTouchStart={onWrapperTouchStart}
        onTouchEnd={onWrapperTouchEnd}
        onTouchMove={onWrapperTouchMove}
        className={classes.wrapper}
      >
        <Motion
          defaultStyle={{
            translateX: activeItemTranslateX,
          }}
          style={{
            translateX: spring(activeItemTranslateX + touchRelativeX, springConfig),
          }}
          children={({ translateX }) => this.renderList({
            items,
            measureRef,
            containerWidth,
            translateX,
          })}
        />
        {
          _showRightChevron &&
          <div
            style={getCarouselRightChevronStyle({
              chevronWidth,
              outsideChevron,
            })}
            className={classes.rightChevronWrapper}
            onClick={() => requestToChangeActive(nextItemIndex)}
          >
            {rightChevron}
          </div>
        }
        {
          _showLeftChevron &&
          <div
            style={getCarouselLeftChevronStyle({
              chevronWidth,
              outsideChevron,
            })}
            className={classes.leftChevronWrapper}
            onClick={() => requestToChangeActive(previousItemIndex)}
          >
            {leftChevron}
          </div>
        }
      </div>
    );
  }
}

ItemsCarouselBase.defaultProps = {
  onWrapperTouchStart: null,
  onWrapperTouchEnd: null,
  onWrapperTouchMove: null,
};

ItemsCarouselBase.propTypes = {
  ...userPropTypes,
  // Props coming from withCarouselValues
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
  activeItemTranslateX: PropTypes.number.isRequired,
  nextItemIndex: PropTypes.number.isRequired,
  previousItemIndex: PropTypes.number.isRequired,
  // Props coming from withContainerWidth
  containerWidth: PropTypes.number.isRequired,
  measureRef: PropTypes.oneOfType([
    PropTypes.func, // for legacy refs
    PropTypes.shape({ current: PropTypes.object })
  ]).isRequired,
  // Props coming from withSwipe
  touchRelativeX: PropTypes.number.isRequired,
  onWrapperTouchStart: PropTypes.func,
  onWrapperTouchEnd: PropTypes.func,
  onWrapperTouchMove: PropTypes.func,
};

export default ItemsCarouselBase;
