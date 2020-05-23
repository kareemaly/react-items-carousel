import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';

import 'brace/mode/jsx';
import 'brace/theme/tomorrow_night';

const renderValue = value => {
  if (isObject(value)) {
    return JSON.stringify(value);
  }
  if (isString(value)) {
    return `'${value}'`;
  }
  return value;
};

export const editorStyleProps = {
  theme: 'tomorrow_night',
  style: { lineHeight: 1.8, fontSize: '.9rem', width: '100%' },
  editorProps: { $blockScrolling: true },
};

// Render editor
const EditorViewer = ({ componentProps = {}, wrapperStyle, noOfChildren }) => {
  const withDataFetching = componentProps.enablePlaceholder;
  return (
    <AceEditor
      {...editorStyleProps}
      mode="jsx"
      name="EDITOR_VIEWER"
      value={`<div style={${JSON.stringify(wrapperStyle)}}>
  <ItemsCarousel${withDataFetching ? '\n    placeholderItem={<div style={{ height: 200, background: \'#EEE\' }} />}' : ''}
${Object.keys(componentProps).map(key => (
        `    ${key}={${renderValue(componentProps[key])}}`
      )).join('\n')}
    activeItemIndex={this.state.activeItemIndex}
    requestToChangeActive={value => this.setState({ activeItemIndex: value })}
    rightChevron={'>'}
    leftChevron={'<'}
  >
    {${withDataFetching ? 'isDataFetching ? [] : ' : ''}Array.from(new Array(${noOfChildren})).map((_, i) =>
      <div
        key={i}
        style={{
          height: 200,
          background: 'url(https://placeimg.com/380/200/nature)'
        }}
      />
    )}
  </ItemsCarousel>
</div>`}
      readOnly={true}
    />
  );
};

export default EditorViewer;
