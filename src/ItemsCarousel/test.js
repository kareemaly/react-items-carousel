import React from 'react';
import { presets } from 'react-motion';
import Measure from 'react-measure';
import ItemsCarousel from './index';
import * as _ from 'lodash';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
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

const InputsWrapper = styled.div`
  margin-top: 50px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Label = styled.div`
  margin-right: 10px;
`;

const AppShellItem = styled.div`
  height: 200px;
  display: flex;
  background: #900;
  color: #FFF;
  align-items: center;
  justify-content: center;
`;

const SlideItem = styled.div`
  height: 200px;
  display: flex;
  background: #333;
  color: #FFF;
  align-items: center;
  justify-content: center;
`;


const createChildren = n => _.range(n).map(i => <SlideItem key={i}>{i+1}</SlideItem>);

export default class Test extends React.Component {

  componentWillMount() {
    this.setState({
      stiffness: presets.noWobble.stiffness,
      damping:  presets.noWobble.damping,
      precision: presets.noWobble.precision,
      children: [],
    });

    setTimeout(() => {
      this.setState({
        children: createChildren(10),
      })
    }, 2000);
  }

  renderDesktopSlider() {
    const {
      stiffness,
      damping,
      precision,
      children,
    } = this.state;
    return (
      <div>
        <h3>Desktop versions</h3>
        <SliderWrapper>
          <ItemsCarousel
            disableScrolling
            gutter={12}

            enableAppShell
            minimumAppShellTime={5000}
            numberOfShellItems={6}
            appShellItem={<AppShellItem />}

            numberOfCards={6}
            chevronWidth={24}
            outsideChevron
            rightChevron={<div>&#10097;</div>}
            leftChevron={<div>&#10096;</div>}

            stiffness={stiffness}
            damping={damping}
            precision={precision}
          >
            {children}
          </ItemsCarousel>
        </SliderWrapper>
      </div>
    );
  }

  renderMobileSlider() {
    const {
      stiffness,
      damping,
      precision,
      children,
    } = this.state;

    return (
      <div>
        <h3>Mobile version</h3>
        <ItemsCarousel
          freeScrolling

          enableAppShell
          minimumAppShellTime={5000}
          numberOfShellItems={6}
          appShellItem={<AppShellItem />}

          canCenterOne={false}
          firstItemGutter={24}
          lastItemGutter={24}
          gutter={12}
          numberOfCards={2}

          stiffness={stiffness}
          damping={damping}
          precision={precision}
        >
          {children}
        </ItemsCarousel>
      </div>
    );
  }

  render() {
    const {
      stiffness,
      damping,
      precision,
    } = this.state;

    return (
      <Wrapper>
        <Measure whitelist={['width']}>
          {({ width}) => width < 1200 ? this.renderMobileSlider() : this.renderDesktopSlider()}
        </Measure>
        <InputsWrapper>
          <InputWrapper>
            <Label>
              Stiffness
            </Label>
            <input type="number" onChange={(e) => this.setState({ stiffness: Number(e.target.value) })} value={stiffness} />
          </InputWrapper>
          <InputWrapper>
            <Label>
              Damping
            </Label>
            <input type="number" onChange={(e) => this.setState({ damping: Number(e.target.value) })} value={damping} />
          </InputWrapper>
          <InputWrapper>
            <Label>
              Precision
            </Label>
            <input onChange={(e) => this.setState({ precision: Number(e.target.value) })} value={precision} />
          </InputWrapper>
        </InputsWrapper>
      </Wrapper>
    );
  }
}
