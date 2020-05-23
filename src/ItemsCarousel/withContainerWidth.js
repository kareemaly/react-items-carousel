import React from 'react';
import Measure from 'react-measure';

export default () => (Cpmt) => (props) => (
  <Measure
    bounds
    margin={false}
    whitelist={['width', 'height']}
  >
    {({ measureRef, contentRect }) => (
      <Cpmt
        {...props}
        measureRef={measureRef}
        containerWidth={contentRect.bounds.width || 0}
        containerHeight={contentRect.bounds.height || 0}
      />
    )}
  </Measure>
);