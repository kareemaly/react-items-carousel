import React, { useState, useEffect } from 'react';
import AceEditor from "react-ace";
import "brace/mode/json";
import {editorStyleProps} from './EditorViewer';

const JSONEditor = ({
  json,
  onJSONChange,
}) => {
  const [value, setValue] = useState(JSON.stringify(json, null, 2));
  useEffect(() => {
    setValue(JSON.stringify(json, null, 2));
  }, [json]);
  const onChange = value => {
    try {
      const parsedValue = JSON.parse(value);
      onJSONChange(parsedValue);
    } catch(err) {
      setValue(value);
    }
  };
  return (
    <AceEditor
      {...editorStyleProps}
      mode="json"
      onChange={onChange}
      value={value}
      name="JSON_EDITOR"
    />
  );
};

export default JSONEditor;
