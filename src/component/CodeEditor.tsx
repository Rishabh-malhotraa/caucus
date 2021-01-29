import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-statusbar';
import 'ace-builds/src-noconflict/ext-themelist';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-mono_industrial';
import 'ace-builds/src-noconflict/keybinding-vim';
import Select from 'react-select';
import { Typography } from '@material-ui/core';

const languages = ['c_cpp', 'java', 'python', 'typescript', 'golang'];

const langaugeOptions = [
  { value: 'c_cpp', label: 'C++' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'typescript', label: 'Typescript' },
  { value: 'golang', label: 'GO' },
];

const theme = ['moonkai', 'light'];

let text =
  '{\n  "id": 0,\n  ' +
  '"script": """\n   function add(x, y) {\n      return x + y;\n   }\n   add(1, 2);\n   """' +
  ',\n   "descr": "add two numbers"\n}';

const CodeEditor = () => {
  return (
    <div style={{ width: '100%' }}>
      <AceEditor
        width="100%"
        placeholder="Enter Code"
        mode="c_cpp"
        theme="mono_industrial"
        name="Ace-Editor-Instance"
        // onChange={}
        fontSize={16}
        showPrintMargin={true}
        showGutter={true}
        keyboardHandler="vim"
        highlightActiveLine={true}
        value={text}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      {/* <Select options={langaugeOptions} /> */}
    </div>
  );
};
export default CodeEditor;
