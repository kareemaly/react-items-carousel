import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring, presets } from 'react-motion';
import Measure from 'react-measure';
import styled from 'styled-components';
import range from 'lodash/range';
import {
  calculateItemWidth,
  calculateItemLeftGutter,
  calculateItemRightGutter,
} from './helpers';

const SliderItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: hidden;
`;

const SliderItem = styled.div`
  width: ${(props) => props.width}px;
  flex-shrink: 0;
  margin-right: ${(props) => props.rightGutter}px;
  margin-left: ${(props) => props.leftGutter}px;
`;

export class PlaceholderCarousel extends React.Component {
  componentWillMount() {
    this.setState({
      containerWidth: this.props.containerWidth || 0,
    });
  }

  render() {
    const {
      gutter,
      placeholderItem,
      numberOfPlaceholderItems,
      numberOfCards,
      firstAndLastGutter,
      showSlither,
      renderPlaceholderItem,
    } = this.props;

    const {
      containerWidth,
    } = this.state;

    const width = calculateItemWidth({
      firstAndLastGutter,
      containerWidth,
      gutter,
      numberOfCards,
      showSlither,
    });

    return (
      <Measure
        includeMargin={false}
        whitelist={['width']}
        onMeasure={({ width }) => {
          this.setState({ containerWidth: width });
        }}
      >
        <SliderItemsWrapper>
          {range(numberOfPlaceholderItems).map((index) => (
            <SliderItem
              key={index}
              leftGutter={calculateItemLeftGutter({
                index,
                firstAndLastGutter,
                gutter,
              })}
              rightGutter={calculateItemRightGutter({
                index,
                firstAndLastGutter,
                gutter,
                numberOfChildren: numberOfPlaceholderItems,
              })}
            >
              { React.cloneElement(placeholderItem, { width }) }
            </SliderItem>
          ))}
        </SliderItemsWrapper>
      </Measure>
    );
  }
}

PlaceholderCarousel.propTypes = {
  gutter: PropTypes.number,
  showSlither: PropTypes.bool,
  firstAndLastGutter: PropTypes.bool,
  placeholderItem: PropTypes.element,
  numberOfCards: PropTypes.number,
  numberOfPlaceholderItems: PropTypes.number,
  containerWidth: PropTypes.number,
};

export default PlaceholderCarousel;