import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Icon, Col } from 'antd';
import ItemsCarousel from '../../src/ItemsCarousel';
import { createImageChildren } from './CarouselSlideItem';

const noOfItems = 7;
const noOfCards = 2;
const chevronWidth = 60;

const Wrapper = styled.div`
  padding: 0 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const carouselItems = createImageChildren(noOfItems);

export default () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  return (
    <Wrapper>
      <ItemsCarousel
        infiniteLoop
        gutter={12}
        numberOfCards={noOfCards}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={setActiveItemIndex}
        rightChevron={
          <Button shape="circle">
            <Icon type="right" />
          </Button>
        }
        leftChevron={
          <Button shape="circle">
            <Icon type="left" />
          </Button>
        }
        chevronWidth={chevronWidth}
        children={carouselItems}
      />
    </Wrapper>
  );
};
