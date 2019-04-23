import React from 'react';
import styled from 'styled-components';
import range from 'lodash/range';

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

export const createImageChildren = n => range(n).map((i) => (
  <SlideItem key={i} src={`https://placeimg.com/380/200/nature?i=${i}`} />
));
