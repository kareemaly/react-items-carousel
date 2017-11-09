import React from 'react';
import { presets } from 'react-motion';
import Measure from 'react-measure';
import styled from 'styled-components';
import * as _ from 'lodash';
import ItemsCarousel from './index';

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #EEE;
`;

const CarouselWrapper = styled.div`
  margin: 20px 0;
`;

const PlaceholderItem = styled.div`
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

const ItemButton = styled.div`
  padding: 20px;
  background: ${(props) => props.isActive ? '#900' : '#333'};
  color: #FFF;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin: 20px;
  flex-wrap: wrap;
`;

const createChildren = n => _.range(n).map(i => <SlideItem key={i}>{i + 1}</SlideItem>);

export class ItemsCarouselTest extends React.Component {

  componentWillMount() {
    this.setState({
      children: [],
      activeItemIndex: 0,
    });

    setTimeout(() => {
      this.setState({
        children: createChildren(20),
      })
    }, 100);
  }

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  render() {
    const {
      activeItemIndex,
      children,
    } = this.state;

    return (
      <Wrapper>
        <CarouselWrapper>
          <ItemsCarousel
            // Placeholder configurations
            placeholderItem={<PlaceholderItem />}
            enablePlaceholder
            numberOfPlaceholderItems={5}
            minimumPlaceholderTime={1000}

            // Carousel configurations
            numberOfCards={3}
            gutter={12}
            showSlither={false}
            firstAndLastGutter={true}
            freeScrolling={false}
            slidesToScroll={3}

            // Active item configurations
            requestToChangeActive={this.changeActiveItem}
            activeItemIndex={activeItemIndex}
            activePosition={'right'}

            chevronWidth={24}
            rightChevron={'>'}
            leftChevron={'<'}
            outsideChevron={false}

            children={children}
          />
        </CarouselWrapper>
        <CarouselWrapper>
          <ItemsCarousel
            // Placeholder configurations
            placeholderItem={<PlaceholderItem />}
            enablePlaceholder
            numberOfPlaceholderItems={5}
            minimumPlaceholderTime={1000}

            // Carousel configurations
            numberOfCards={1}
            gutter={12}
            showSlither={true}
            firstAndLastGutter={true}
            freeScrolling={false}
            slidesToScroll={3}

            // Active item configurations
            requestToChangeActive={this.changeActiveItem}
            activeItemIndex={activeItemIndex}
            activePosition={'center'}

            chevronWidth={24}
            rightChevron={'>'}
            leftChevron={'<'}
            outsideChevron={false}

            children={children}
          />
        </CarouselWrapper>
        <ButtonsWrapper>
          {children.map((item, index) => (
            <ItemButton isActive={index === activeItemIndex} onClick={() => this.changeActiveItem(index)} key={index}>
              {index + 1}
            </ItemButton>
          ))}
        </ButtonsWrapper>
      </Wrapper>
    );
  }
}

export default ItemsCarouselTest;