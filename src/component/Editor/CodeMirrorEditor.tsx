import React, { useEffect, useContext, useRef } from "react";
import { CDRT_SERVER } from "config.keys";
import { CodeMirrorBinding } from "./CodeMirrorAdapter";
import { GuestNameContext } from "service/GuestNameContext";
import { UserContext } from "service/UserContext";
import { SettingContext } from "service/SettingsContext";
import { useSnackbar } from "notistack";
import { useRoomID } from "service/RoomIdContext";
import "./CodeMirrorImports.ts";
import { GuestNameContextTypes, SettingsContextType, UserContextTypes } from "types";
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
  const handleEditorDidMount = (editor: any) => {
    //@ts-ignore
    window.editor = editor;
    setEditorInstance(editor);
  };

  const { roomID } = useRoomID();

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
