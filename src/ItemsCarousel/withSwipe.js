import React, { useState } from 'react';
import { calculateItemWidth } from './helpers';

const getFirstTouchClientX = (touches, defaultValue = 0) => {
  if (touches && touches.length > 0) {
    return touches[0].clientX;
  }
  return defaultValue;
};

export default () => (Cpmt) => (props) => {
  const [startTouchX, setStartTouchX] = useState(0);
  const [currentTouchX, setCurrentTouchX] = useState(0);

  const onWrapperTouchStart = e => {
    const touchClientX = getFirstTouchClientX(e.touches);
    setStartTouchX(touchClientX);
    setCurrentTouchX(touchClientX)
  };

  const onWrapperTouchEnd = e => {
    const {
      containerWidth,
      gutter,
      numberOfCards,
      firstAndLastGutter,
      showSlither,
      requestToChangeActive,
      activeItemIndex,
    } = props;

    const itemWidth = calculateItemWidth({
      containerWidth,
      gutter,
      numberOfCards,
      firstAndLastGutter,
      showSlither,
    });

    const touchClientX = getFirstTouchClientX(e.changedTouches);

    const touchRelativeX = startTouchX - touchClientX;

    // When the user swipes to 0.25 of the next item
    const threshold = 0.25;

    const noOfItemsToSwipe = Math.floor(Math.abs(touchRelativeX) / (itemWidth + gutter / 2) + (1 - threshold));

    if (noOfItemsToSwipe > 0) {
      requestToChangeActive(
        touchRelativeX < 0 ? activeItemIndex - noOfItemsToSwipe : activeItemIndex + noOfItemsToSwipe
      );
    }

    setStartTouchX(0);
    setCurrentTouchX(0)
  };

  const onWrapperTouchMove = e => {
    setCurrentTouchX(getFirstTouchClientX(e.touches))
  };

  const {
    disableSwipe,
    isPlaceholderMode,
  } = props;

  if (disableSwipe || isPlaceholderMode) {
    return (
      <Cpmt {...props} touchRelativeX={0} />
    );
  }

  return (
    <Cpmt
      {...props}
      onWrapperTouchStart={onWrapperTouchStart}
      onWrapperTouchEnd={onWrapperTouchEnd}
      onWrapperTouchMove={onWrapperTouchMove}
      touchRelativeX={startTouchX - currentTouchX}
    />
  )


}