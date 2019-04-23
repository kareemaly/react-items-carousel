import React from 'react';
import styled from 'styled-components';
import { Tag, Icon } from 'antd';


const HeroWrapper = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #F9F9F9;
`;

const Title = styled.h1`
`;

const SubTitle = styled.h2`
  color: #999;
  font-weight: 400;
`;

const Version = styled(Tag)`
`;

const Hero = ({ version }) => (
  <HeroWrapper>
    <Title>
      <Icon style={{ marginRight: 10 }} type="github" />
      react-items-carousel
    </Title>
    <SubTitle>
      Items Carousel Built with react-motion and styled-components.
    </SubTitle>
    <Version>
      v{version}
    </Version>
  </HeroWrapper>
);

export default Hero;
