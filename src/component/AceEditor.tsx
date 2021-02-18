import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-language_tools';
import 'ace-builds/src-min-noconflict/ext-searchbox';
import 'ace-builds/src-min-noconflict/ext-statusbar';
import 'ace-builds/src-noconflict/ext-themelist';

import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/keybinding-vim';
// import Select from 'react-select';

// const languages = ['c_cpp', 'java', 'python', 'typescript', 'golang'];

// const langaugeOptions = [
//   { value: 'c_cpp', label: 'C++' },
//   { value: 'python', label: 'Python' },
//   { value: 'java', label: 'Java' },
//   { value: 'typescript', label: 'Typescript' },
//   { value: 'golang', label: 'GO' },
// ];

// const theme = ['moonkai', 'light'];

// let text =
//   '{\n  "id": 0,\n  ' +
//   '"script": """\n   function add(x, y) {\n      return x + y;\n   }\n   add(1, 2);\n   """' +
//   ',\n   "descr": "add two numbers"\n}';

interface AppProps {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  AceEditorRef: React.MutableRefObject<any>;
}

const CodeEditor: React.FC<AppProps> = ({ text, setText, AceEditorRef }) => {
  return (
    <AceEditor
      style={{ flexGrow: 1 }}
      ref={AceEditorRef}
      // maxLines={Infinity}
      // width="100%"
      height="100%"
      placeholder="Enter Code"
      mode="c_cpp"
      theme="monokai"
      name="Ace-Editor-Instance"
      onChange={(code: string) => setText(code)}
      fontSize={16}
      showPrintMargin={true}
      showGutter={true}
      keyboardHandler="vim"
      highlightActiveLine={true}
      value={text}
      setOptions={{
        showPrintMargin: false,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        wrap: true,
        fontSize: '16px',
        wrapBehavioursEnabled: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
      }}
    />
  );
};
export default CodeEditor;
