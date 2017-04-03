import React from 'react';
import Measure from 'react-measure';
import ItemsCarousel from './index';
import * as _ from 'lodash';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SlideItem = styled.div`
  height: 200px;
  display: flex;
  background: #333;
  color: #FFF;
  align-items: center;
  justify-content: center;
`;

const SliderWrapper = styled.div`
  position: relative;
`;

const SliderRightChevron = styled.div`
  position: absolute;
  height: 100%;
  width: 20px;
  background: #FFF;
  right: -20px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderLeftChevron = styled.div`
  position: absolute;
  height: 100%;
  width: 20px;
  background: #FFF;
  left: -20px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const createChildren = n => _.range(n).map(i => <SlideItem key={i}>{i+1}</SlideItem>);

class Test extends React.Component {

  componentWillMount() {
    this.setState({
      centeredItemIndex: 2,
    });
  }

  renderDesktopSlider(centeredItemIndex) {
    return (
      <div>
        <h3>Desktop versions</h3>
        <SliderWrapper>
          <ItemsCarousel
            centeredItemIndex={centeredItemIndex}
            onCenteredItemChange={(index) => {
              this.setState({ centeredItemIndex: index });
            }}
            gutter={12}
            numberOfCards={6}
          >
            {createChildren(10)}
          </ItemsCarousel>
          {centeredItemIndex < (9 - 3) ?
            <SliderRightChevron
              onClick={() => {
                this.setState({ centeredItemIndex: centeredItemIndex === 0 ? 3 : centeredItemIndex + 1 });
              }}
            >
            &#10097;
            </SliderRightChevron> : null}
          {centeredItemIndex >= 3 ?
            <SliderLeftChevron
              onClick={() => {
                this.setState({ centeredItemIndex: centeredItemIndex === 9 ? 6 : centeredItemIndex - 1 });
              }}
            >
            &#10096;
            </SliderLeftChevron> : null}
        </SliderWrapper>
      </div>
    );
  }

  renderMobileSlider() {
    return (
      <div>
        <h3>Mobile version</h3>
        <ItemsCarousel canCenterOne={false} firstItemGutter={24} lastItemGutter={24} gutter={12} numberOfCards={2}>
          {createChildren(10)}
        </ItemsCarousel>
      </div>
    );
  }

  render() {
    const {
      centeredItemIndex,
    } = this.state;
    return (
      <Wrapper>
        <Measure>
          {({ width }) => width < 1200 ? this.renderMobileSlider() : this.renderDesktopSlider(centeredItemIndex)}
        </Measure>
      </Wrapper>
    );
  }
}

export default () => <Test />;