import React from 'react';
import { Form, Row, Col, Slider, InputNumber } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const PlaygroundTools = ({
  numberOfCards,
  gutter,
  updateProp,
}) => (
  <Form {...formItemLayout} style={{ width: '40%' }}>
    <Row gutter={6}>
      <Col span={24}>
        <Form.Item
          label={'numberOfCards'}
        >
          <Slider
            min={1}
            max={10}
            value={numberOfCards}
            onChange={value => updateProp('numberOfCards', value)}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label={'gutter'}
        >
          <Slider
            min={0}
            max={24}
            value={gutter}
            onChange={value => updateProp('gutter', value)}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          label={'numberOfCards'}
        >
          <Slider
            min={1}
            max={10}
            value={numberOfCards}
            onChange={value => updateProp('numberOfCards', value)}
          />
        </Form.Item>
      </Col>
    </Row>
  </Form>
);

export default PlaygroundTools;
