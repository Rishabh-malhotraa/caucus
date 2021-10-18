import React from "react";
import Editor from "@monaco-editor/react";
// @ts-ignore
import { GuestNameContext } from "service/GuestNameContext";
import { UserContext } from "service/UserContext";
import registerNamespaceConfigLanguage from "service/AddHaskellLanguage";
import { CDRT_SERVER, SERVER_URL } from "config.keys";
import { CodeExecutionInfoContext } from "service/CodeExecutionInfo";
import { socket } from "service/socket";
import axios from "axios";
import defineNewThemes from "service/defineNewThemes";
import { SettingContext } from "service/SettingsContext";
import { GuestNameContextTypes, SettingsContextType, UserContextTypes, CodeExecutionInfoType } from "types";
import { useSnackbar } from "notistack";
import { useRoomID } from "service/RoomIdContext";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { getRandomColor } from "service/getRandomColor";
import { useEffect } from "react";

interface AppProps {
  editorInstance: any;
  setEditorInstance: React.Dispatch<any>;
}

const MonacoEditor: React.FC<AppProps> = ({ editorInstance, setEditorInstance }) => {
  const { language, fontSize, theme, keybinds } = React.useContext(SettingContext) as SettingsContextType;
  const { setValue, setLoading, inputText, setOutputData } = React.useContext(
    CodeExecutionInfoContext
  ) as CodeExecutionInfoType;
  const { roomID } = useRoomID();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = React.useContext(UserContext) as UserContextTypes;
  const { guestName } = React.useContext(GuestNameContext) as GuestNameContextTypes;

  // to save monaco instance
  const monacoRef = React.useRef(null);
  // to save vimEditor instance
  const monacoVimRef = React.useRef(null);
  // to save emacsEditor instance
  const monacoEmacsRef = React.useRef(null);
  // to hold last editor to dispose() it
  const previousEditor = React.useRef("default");

  // if login then user that else guest name else randome name :)))
  const username = user?.name ? user.name : guestName;

  /**
   * 1_ check current keybinds,
   * 2_ check last editor and call dispose function to
   * 3_ register new keybind with different script
   * 4_ to going back to default state it dispose the last editor
   */
  useEffect(() => {
    if (keybinds === "vim") {
      if (previousEditor?.current === "emacs") {
        // @ts-ignore
        monacoEmacsRef.current.dispose();
      }
      previousEditor.current = "vim";
      if (editorInstance) {
        // setup monaco-vim
        // @ts-ignore
        window.require.config({
          paths: {
            "monaco-vim": "https://unpkg.com/monaco-vim/dist/monaco-vim",
          },
        });

        // @ts-ignore
        window.require(["monaco-vim"], function (MonacoVim) {
          const statusNode = document.querySelector(".status-node");
          const monacoVim = MonacoVim.initVimMode(editorInstance, statusNode);
          monacoVimRef.current = monacoVim;
        });
      }
    } else if (keybinds === "emacs") {
      if (previousEditor?.current === "vim") {
        // @ts-ignore
        monacoVimRef.current.dispose();
      }
      previousEditor.current = "emacs";
      if (editorInstance) {
        // setup monaco-emacs
        // @ts-ignore
        window.require.config({
          paths: {
            "monaco-emacs": "https://unpkg.com/monaco-emacs/dist/monaco-emacs",
          },
        });
        // @ts-ignore
        window.require(["monaco-emacs"], function (MonacoEmacs) {
          const emacsMode = new MonacoEmacs.EmacsExtension(editorInstance);
          emacsMode.start();
          monacoEmacsRef.current = emacsMode;
        });
      }
    } else {
      if (previousEditor?.current === "vim") {
        // @ts-ignore
        monacoVimRef?.current?.dispose();
      }
      if (previousEditor?.current === "emacs") {
        // @ts-ignore
        monacoEmacsRef?.current?.dispose();
      }

      previousEditor.current = "default";
    }
  }, [keybinds]);

  React.useEffect(() => {
    const ydoc: Y.Doc = new Y.Doc();
    let provider;
    try {
      provider = new WebsocketProvider(CDRT_SERVER, roomID, ydoc);
    } catch (err) {
      enqueueSnackbar("Could not connect to the server", {
        variant: "warning",
      });
      throw Error("could not connect to the server");
    }

    const awareness = provider?.awareness;
    const val = getRandomColor("DEFAULT");
    awareness?.setLocalStateField("user", {
      // Define a print name that should be displayed
      name: username,
      // Define a color that should be associated to the user:
      color: val, // should be a hex color:
    });
  }, []);

  const submitProblem = React.useCallback(async () => {
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

  const handleEditorWillMount = React.useCallback((monaco) => {
    registerNamespaceConfigLanguage(monaco, "haskell");
    defineNewThemes(monaco);
  }, []);

  const handleEditorDidMount = React.useCallback((editor, monaco) => {
    setEditorInstance(editor);
    monacoRef.current = monaco;
  }, []);

  // this is to F2 keybinds and it's action
  useEffect(() => {
    if (editorInstance && monacoRef.current) {
      editorInstance.addAction({
        id: "runTheCode",
        label: "running the code",
        // @ts-ignore
        keybindings: [monacoRef.current.KeyCode.F2],
        contextMenuGroupId: "1_modification",
        contextMenuOrder: 10,
        run: submitProblem,
      });
    }
  }, [editorInstance]);

  return (
    <>
      <Editor
        width="100%"
        height="100%"
        defaultLanguage="cpp"
        theme={theme}
        language={language}
        options={{
          formatOnType: true,
          tabSize: 2,
          cursorSmoothCaretAnimation: true,
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          fontSize: fontSize,
          cursorStyle: "block-outline",
          wordWrap: "on",
        }}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
      />
      <code className="status-node"></code>
    </>
  );
};

export default MonacoEditor;
