import React from 'react';
import Measure from 'react-measure';
import styled from 'styled-components';

const SliderItemsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  transform: translate(${(props) => props.translateX}px, 0);
`;

const SliderItem = styled.div`
  width: ${(props) => props.width}px;
  flex-shrink: 0;
  margin-right: ${(props) => props.rightGutter}px;
`;

export default class ItemsCarouselList extends React.Component {
  static propTypes = {
    freeScrollingLastItemGutter: React.PropTypes.number,
    translateX: React.PropTypes.number,
    gutter: React.PropTypes.number,
    children: React.PropTypes.arrayOf(React.PropTypes.element),
  };

  shouldComponentUpdate(nextProps, nextState) {
    if(Math.abs(nextProps.translateX - this.props.translateX) > 0.2) {
      return true;
    }

    if(nextProps.gutter !== this.props.gutter) {
      return true;
    }

    if(nextProps.freeScrollingLastItemGutter !== this.props.freeScrollingLastItemGutter) {
      return true;
    }

    // As long as the carousel is not ready keep updating
    if(!nextProps.isReady) {
      return true;
    }

    return false;
  }

  render() {
    const {
      translateX,
      gutter,
      freeScrollingLastItemGutter,
      children,
      animator,
    } = this.props;

    return (
      <SliderItemsWrapper translateX={translateX}>
        {children.map((child, index) => (
          <SliderItem
            key={index}
            width={animator.getItemWidth()}
            rightGutter={index === children.length - 1 ? freeScrollingLastItemGutter : gutter}
          >
            {child}
          </SliderItem>
        ))}
        {freeScrollingLastItemGutter > 0 ?
          <div style={{ fontSize: 0.1 }}>a</div> : null}
      </SliderItemsWrapper>
    );
  }
}