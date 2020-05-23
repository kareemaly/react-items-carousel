import React, { useState, useEffect } from 'react';
import range from 'lodash/range';
import styled from 'styled-components';
import ItemsCarousel from '../../src/ItemsCarousel';

const noOfItems = 12;
const noOfCards = 3;
const autoPlayDelay = 2000;
const chevronWidth = 40;

const Wrapper = styled.div`
  padding: 0 ${chevronWidth}px;
  max-width: 1000px;
  margin: 0 auto;
`;

const SlideItem = styled.div`
  height: 200px;
  background: #EEE;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
`;

const carouselItems = range(noOfItems).map(index => (
  <SlideItem key={index}>
    {index + 1}
  </SlideItem>
));

const AutoPlayCarousel = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  let interval = null;

  useEffect(() => {
    interval = setInterval(tick, autoPlayDelay);
    return () => { clearInterval(interval); }
  }, [])

  const tick = () => setActiveItemIndex(prevState => (prevState + 1) % (noOfItems - noOfCards + 1));
  const onChange = value => setActiveItemIndex(value);

  return (
    <Wrapper>
      <ItemsCarousel
        gutter={12}
        numberOfCards={noOfCards}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={onChange}
        rightChevron={<button>{'>'}</button>}
        leftChevron={<button>{'<'}</button>}
        chevronWidth={chevronWidth}
        outsideChevron
        children={carouselItems}
      />
    </Wrapper>
  );
}

export default AutoPlayCarousel;
