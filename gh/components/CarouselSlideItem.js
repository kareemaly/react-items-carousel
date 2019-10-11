import React from 'react';
import styled from 'styled-components';
import range from 'lodash/range';
import nature from '../assets/images/nature.jpeg';
import nature_0 from '../assets/images/nature_0.jpeg';
import nature_1 from '../assets/images/nature_1.jpeg';
import nature_2 from '../assets/images/nature_2.jpeg';
import nature_3 from '../assets/images/nature_3.jpeg';
import nature_4 from '../assets/images/nature_4.jpeg';
import nature_5 from '../assets/images/nature_5.jpeg';

const items = [
  nature,
  nature_0,
  nature_1,
  nature_2,
  nature_3,
  nature_4,
  nature_5,
];

export const PlaceholderItem = styled.div`
  height: 200px;
  background: #EEE;
`;

export const SlideItem = styled.div`
  height: 200px;
  width: 100%;
  background: url('${props => props.src}');
  background-size: cover;
  background-position: center;
`;

const SlideItemIndex = styled.div`
  color: #FFF;
  font-weight: bold;
  font-size: 16px;
  background: #333;
  border: 2px solid #000;
  border-left: 0;
  border-top: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const createImageChildren = n => range(n).map((i) => (
  <SlideItem key={i} src={items[i%items.length]}>
    <SlideItemIndex>{i}</SlideItemIndex>
  </SlideItem>
));
