import React from 'react';
import { Layout , Divider, Menu } from 'antd';
import Hero from './components/Hero';
import Playground from './components/Playground';
import pckJson from '../package.json';
import PlaceholderDemo from './components/PlaceholderDemo';

const { Content, Footer, Header } = Layout;

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
      <Playground />
      <Divider />
      <PlaceholderDemo />
    </Content>
    <Footer style={{ background: '#FFF' }}>
      © 2019 <a href="http://www.bitriddler.com">bitriddler</a> | Kareem Elbahrawy
    </Footer>
  </Layout>
);

export default Page;
