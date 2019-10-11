import React from 'react';
import { Layout , Divider, Menu, Col } from 'antd';
import Hero from './components/Hero';
import Playground from './components/Playground';
import pckJson from '../package.json';
import PlaceholderDemo from './components/PlaceholderDemo';
import AutoPlayCarousel from './components/AutoPlayCarousel';
import InfiniteLoopDemo from './components/InfiniteLoopDemo';
import InfiniteLoopDemoString from '!!raw-loader!./components/InfiniteLoopDemo';
import DemoHeader from './components/DemoHeader';
import AutoPlayCarouselString from '!!raw-loader!./components/AutoPlayCarousel';
import CenteredRow from './components/CenteredRow';
import JsxEditor from './components/JsxEditor';

const { Content, Footer, Header } = Layout;

const enableDemos = {
  playground: true,
  infiniteLoop: true,
  placeholder: true,
  autoPlay: true,
}

const Page = () => (
  <Layout>
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1"><a href="https://github.com/bitriddler/react-items-carousel">Github</a></Menu.Item>
      </Menu>
    </Header>
    <Content style={{ overflowX: 'hidden', background: '#FFF' }}>
      <Hero version={pckJson.version} />
      {enableDemos.playground && (
        <>
          <Playground />
          <Divider />
        </>
      )}
      {enableDemos.infiniteLoop && (
        <>
          <DemoHeader
            title={'Infinite Loop'}
          />
          <InfiniteLoopDemo />
          <CenteredRow withMaxWidth>
            <Col span={24}>
              <JsxEditor value={InfiniteLoopDemoString} />
            </Col>
          </CenteredRow>
          <Divider />
        </>
      )}
      {enableDemos.placeholder && (
        <>
          <PlaceholderDemo />
          <Divider/>
        </>
      )}
      {enableDemos.autoPlay && (
        <>
          <DemoHeader
            title={'Autoplay'}
            description={'Example that shows how to extend the carousel to add autoplay functionality'}
          />
          <AutoPlayCarousel/>
          <CenteredRow withMaxWidth>
            <Col span={24}>
              <JsxEditor value={AutoPlayCarouselString} />
            </Col>
          </CenteredRow>
        </>
      )}
    </Content>
    <Footer style={{ background: '#FFF' }}>
      © 2019 <a href="http://www.bitriddler.com">bitriddler</a> | Kareem Elbahrawy
    </Footer>
  </Layout>
);

export default Page;
