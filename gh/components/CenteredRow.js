import React from 'react';
import styled from 'styled-components';
import { Row } from 'antd';

export default styled(Row)`
  ${props => props.withMaxWidth && `
    max-width: 1000px;
    margin: 0 auto;
  `}
  ${props => !props.noTopPadding && `padding-top: 20px;`}
  ${props => !props.noBottomPadding && `padding-bottom: 20px;`}
  ${props => !props.noLeftPadding && `padding-left: 20px;`}
  ${props => !props.noRightPadding && `padding-right: 20px;`}
`;
