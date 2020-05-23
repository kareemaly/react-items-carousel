import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Icon, Typography, Col } from 'antd';
import ItemsCarousel from '../../src/ItemsCarousel';
import { createImageChildren, PlaceholderItem } from './CarouselSlideItem';
import DemoHeader from './DemoHeader';
import EditorViewer from './EditorViewer';
import CenteredRow from './CenteredRow';

const Wrapper = styled.div`
`;

export const PlaceholderDemo = props => {
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const noOfChildren = 8;
  const children = createImageChildren(noOfChildren);

  const componentProps = {
    enablePlaceholder: true,
    numberOfPlaceholderItems: 3,
    numberOfCars: 3,
    gutter: 12,
    slidesToScroll: 2,
    chevronWidth: 60,
    outsideChevron: true,
    showSlither: false,
    firstAndLastGutter: false,
  };

  const wrapperStyle = {
    padding: '0 60px', maxWidth: 1000, margin: '0 auto'
  };

  return (
    <Wrapper>
      <DemoHeader
        title={'With Placeholder'}
        description={'Useful when fetching carousel items from API'}
      />
      <div style={wrapperStyle}>
        <ItemsCarousel
          {...componentProps}
          placeholderItem={<PlaceholderItem />}
          activeItemIndex={activeItemIndex}
          requestToChangeActive={value => setActiveItemIndex(value)}
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
          children={isLoading ? [] : children}
        />
      </div>
      {
        isLoading && (
          <CenteredRow withMaxWidth justify={'center'} type={'flex'}>
            <Col>
              <Button onClick={() => setLoading(false)}>
                <Icon type="loading" style={{ marginRight: 10 }} />
                {'Click me to finish loading'}
              </Button>
            </Col>
          </CenteredRow>
        )
      }
      <CenteredRow withMaxWidth>
        <Col span={24}>
          <EditorViewer
            wrapperStyle={wrapperStyle}
            componentProps={componentProps}
            noOfChildren={noOfChildren}
          />
        </Col>
      </CenteredRow>
    </Wrapper>
  );

}

export default PlaceholderDemo;