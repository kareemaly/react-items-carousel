import React from 'react';
import { Motion, spring } from 'react-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import userPropTypes from './userPropTypes';
import {
  calculateItemWidth,
  calculateItemLeftGutter,
  calculateItemRightGutter,
  calculateTranslateX,
  showLeftChevron,
  showRightChevron,
  calculateNextIndex,
  calculatePreviousIndex,
} from './helpers';

const CarouselWrapper = styled.div`
  position: relative;
  ${(props) => props.height && `height: ${props.height}px;`}
`;

const Wrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
`;

const SliderItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
`;

const SliderItem = styled.div`
  width: ${(props) => props.width}px;
  flex-shrink: 0;
  margin-right: ${(props) => props.rightGutter}px;
  margin-left: ${(props) => props.leftGutter}px;
`;

const CarouselChevron = styled.div`
  position: absolute;
  height: 100%;
  width: ${(props) => props.chevronWidth + 1}px;
  cursor: pointer;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CarouselRightChevron = styled(props => <CarouselChevron {...props} />)`
  right: -${(props) => props.outsideChevron ? props.chevronWidth : 0}px;
`;

const CarouselLeftChevron = styled(props => <CarouselChevron {...props} />)`
  left: -${(props) => props.outsideChevron ? props.chevronWidth : 0}px;
`;

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
    } = this.props;

    const items = this.getItems();

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

  getItems = () => {
    const {
      isPlaceholderMode,
      placeholderItem,
      numberOfPlaceholderItems,
      children
    } = this.props;

    if (isPlaceholderMode) {
      return Array.from(Array(numberOfPlaceholderItems)).map(index => placeholderItem);
    }

    return React.Children.toArray(children);
  };

  renderList({ items, translateX, containerWidth, measureRef }) {
    const {
      gutter,
      numberOfCards,
      firstAndLastGutter,
      showSlither,
    } = this.props;

    return (
      <Wrapper>
        <SliderItemsWrapper
          ref={measureRef}
          style={{
            transform: `translateX(${translateX * -1}px)`,
          }}
        >
          {items.map((child, index) => (
            <SliderItem
              key={index}
              width={calculateItemWidth({
                firstAndLastGutter,
                containerWidth,
                gutter,
                numberOfCards,
                showSlither,
              })}
              leftGutter={calculateItemLeftGutter({
                index,
                firstAndLastGutter,
                gutter,
              })}
              rightGutter={calculateItemRightGutter({
                index,
                firstAndLastGutter,
                gutter,
                numberOfChildren: items.length,
              })}
            >
              {child}
            </SliderItem>
          ))}
        </SliderItemsWrapper>
      </Wrapper>
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
      activeItemIndex,
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
      // to remove from DOM
      onActiveStateChange,
      ...props
    } = this.props;

    const items = this.getItems();

    const translateX = calculateTranslateX({
      activeItemIndex,
      activePosition,
      containerWidth,
      numberOfChildren: items.length,
      numberOfCards,
      gutter,
      firstAndLastGutter,
      showSlither,
    });

    const {
      isFirstScroll,
      isLastScroll,
    } = this.getScrollState();
    const _showRightChevron = rightChevron && (alwaysShowChevrons || !isLastScroll);
    const _showLeftChevron = leftChevron && (alwaysShowChevrons || !isFirstScroll);

    return (
      <CarouselWrapper
        onTouchStart={onWrapperTouchStart}
        onTouchEnd={onWrapperTouchEnd}
        onTouchMove={onWrapperTouchMove}
        {...props}
      >
        <Motion
          defaultStyle={{
            translateX,
          }}
          style={{
            translateX: spring(translateX + touchRelativeX, springConfig),
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
          <CarouselRightChevron
            chevronWidth={chevronWidth}
            outsideChevron={outsideChevron}
            onClick={() => requestToChangeActive(calculateNextIndex({
              activePosition,
              activeItemIndex,
              numberOfCards,
              slidesToScroll,
              numberOfChildren: items.length,
            }))}
          >
            {rightChevron}
          </CarouselRightChevron>
        }
        {
          _showLeftChevron &&
          <CarouselLeftChevron
            chevronWidth={chevronWidth}
            outsideChevron={outsideChevron}
            onClick={() => requestToChangeActive(calculatePreviousIndex({
              activePosition,
              activeItemIndex,
              numberOfCards,
              slidesToScroll,
              numberOfChildren: items.length,
            }))}
          >
            {leftChevron}
          </CarouselLeftChevron>
        }
      </CarouselWrapper>
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
  // Props coming from withPlaceholderMode
  isPlaceholderMode: PropTypes.bool.isRequired,
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