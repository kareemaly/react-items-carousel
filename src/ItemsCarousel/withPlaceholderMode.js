import React, { useEffect, useState } from 'react';

export default () => (Cpmt) => (props) => {
  const countChildren = countChildren
  const [isPlaceholderMode, setPlaceholderMode] = useState(props.enablePlaceholder && countChildren === 0)
  let placeholderTimer = null;

  const startPlaceholderMinimumTimer = () => {
    if (!props.minimumPlaceholderTime) {
      return;
    }

    placeholderTimer = setTimeout(() => {
      placeholderTimer = null;
      if (countChildren > 0) {
        setPlaceholderMode(false)
      }
    }, props.minimumPlaceholderTime);
  };


  useEffect(() => {
    startPlaceholderMinimumTimer();
    return () => {
      if (placeholderTimer) {
        clearTimeout(placeholderTimer);
      }
    }
  }, [])

  useEffect(() => {
    // Data loaded and no timer to deactivate placeholder mode
    if (
      countChildren > 0 &&
      placeholderTimer &&
      isPlaceholderMode
    ) {
      setPlaceholderMode(false)
    }
  }, [countChildren])

  const getPlaceholderItems = () => {
    const {
      placeholderItem,
      numberOfPlaceholderItems,
    } = props;

    return Array.from(Array(numberOfPlaceholderItems)).map(index => placeholderItem);
  };

  return (
    <Cpmt
      {...props}
      items={isPlaceholderMode ? getPlaceholderItems() : props.items}
    />
  )
}
