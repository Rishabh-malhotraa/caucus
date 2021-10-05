import React, { useEffect, useContext, useCallback } from "react";
import { CDRT_SERVER, SERVER_URL } from "config.keys";
import { CodeMirrorBinding } from "./CodeMirrorAdapter";
import { GuestNameContext } from "service/GuestNameContext";
import { UserContext } from "service/UserContext";
import { CodeExecutionInfoContext } from "service/CodeExecutionInfo";
import { socket } from "service/socket";
import axios from "axios";
import { SettingContext } from "service/SettingsContext";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import "./CodeMirrorImports.ts";
import { GuestNameContextTypes, SettingsContextType, UserContextTypes, CodeExecutionInfoType } from "types";
import { UnControlled as CodeMirror } from "react-codemirror2";
import * as Y from "yjs";
// import { WebsocketProvider } from "y-websocket";
import { WebrtcProvider } from "y-webrtc";
import { getRandomColor } from "service/getRandomColor";
import CssBaseline from "@material-ui/core/CssBaseline";
interface AppProps {
  editorInstance: any;
  setEditorInstance: React.Dispatch<any>;
}

const CodeMirrorEditor: React.FC<AppProps> = ({ editorInstance, setEditorInstance }) => {
  const { setValue, setLoading, inputText, setOutputData } = useContext(
    CodeExecutionInfoContext
  ) as CodeExecutionInfoType;

  const handleEditorDidMount = (editor: any) => {
    //@ts-ignore
    window.editor = editor;
    setEditorInstance(editor);
  };

  const { id: roomID } = useParams<Record<string, string>>();

  const { enqueueSnackbar } = useSnackbar();
  const { language, fontSize, theme, keybinds } = useContext(SettingContext) as SettingsContextType;

  const { user } = useContext(UserContext) as UserContextTypes;
  const { guestName } = useContext(GuestNameContext) as GuestNameContextTypes;

  // if login then user that else guest name else randome name :)))
  const username = user?.name ? user.name : guestName;

  useEffect(() => {
    if (editorInstance != null) {
      const ydoc: Y.Doc = new Y.Doc();
      const yText = ydoc.getText("codemirror");
      const yUndoManager = new Y.UndoManager(yText);
      // const provider = new WebsocketProvider(CDRT_SERVER, roomID, ydoc);

      let provider;
      try {
        //@ts-ignore
        provider = new WebrtcProvider(roomID, ydoc, {
          signaling: [
            "wss://signaling.yjs.dev",
            "wss://y-webrtc-signaling-eu.herokuapp.com",
            "wss://y-webrtc-signaling-us.herokuapp.com",
          ],
        });
      } catch (err) {}

      const awareness = provider?.awareness;
      const val = getRandomColor("DEFAULT");
      awareness?.setLocalStateField("user", {
        // Define a print name that should be displayed
        name: username,
        // Define a color that should be associated to the user:
        color: val, // should be a hex color: ;
      });

      const getBinding = new CodeMirrorBinding(yText, editorInstance, awareness, {
        yUndoManager,
      });
    }
  }, [editorInstance]);

  const submitProblem = useCallback(async () => {
    setLoading(true);
    setValue(1);
    const response = await axios({
      method: "POST",
      url: `${SERVER_URL}/api/execute`,
      data: {
        script: editorInstance.getValue(),
        language: language,
        stdin: inputText,
      },
      responseType: "json",
    });
    socket.emit("code-executed", { data: response.data, roomID: roomID });
    enqueueSnackbar(response.data.memory === null ? "Error in code-execution" : "Code ran succesfully", {
      variant: response.data.memory === null ? "error" : "success",
    });
    setOutputData(response.data);
    setLoading(false);
  }, [SERVER_URL, editorInstance, language, inputText, roomID]);

  return (
    <div style={{ textAlign: "left", width: "100%", fontSize: `${fontSize}px` }}>
      <CodeMirror
        autoScroll
        options={{
          mode: language,
          theme: theme,
          keyMap: keybinds,
          lineWrapping: true,
          smartIndent: true,
          lineNumbers: true,
          foldGutter: true,
          tabSize: 2,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          autoCloseTags: true,
          matchBrackets: true,
          autoCloseBrackets: true,
          extraKeys: {
            "Ctrl-Space": "autocomplete",
            "Ctrl-'": submitProblem,
          },
        }}
        editorDidMount={(editor) => {
          handleEditorDidMount(editor);
          editor.setSize("100%", "100%");
        }}
      />
    </div>
  );
};

export default CodeMirrorEditor;
