import React from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/jsx';
import 'brace/theme/tomorrow_night';

export const editorStyleProps = {
  theme: 'tomorrow_night',
  style: { lineHeight: 1.8, fontSize: '.9rem', width: '100%' },
  editorProps: { $blockScrolling: true },
};

// Render editor
const JsxEditor = ({ ...props }) => {
  return (
    <AceEditor
      {...editorStyleProps}
      {...props}
      mode="jsx"
      name="EDITOR_VIEWER"
      readOnly={true}
    />
  );
};

export default JsxEditor;
