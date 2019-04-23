import React from 'react';
import { Typography, Col } from 'antd';
import CenteredRow from './CenteredRow';

const DemoHeader = ({ title, description, button }) => (
  <CenteredRow noBottomPadding>
    <Col span={24} align={'center'}>
      <Typography.Title level={1}>{title}</Typography.Title>
      <Typography.Paragraph>{description}</Typography.Paragraph>
    </Col>
  </CenteredRow>
);

export default DemoHeader;