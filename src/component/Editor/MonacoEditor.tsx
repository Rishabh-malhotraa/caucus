import React, { useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import { Convergence } from "@convergence/convergence";
import { CONVERGENCE_URL } from "config";
import MonacoConvergenceAdapter from "./MonacoAdapter";
import { GuestNameContext } from "service/GuestNameContext";
import { UserContext } from "service/UserContext";
import { GuestNameContextTypes, SettingsContextType, UserContextTypes } from "types";
import "@convergencelabs/monaco-collab-ext/css/monaco-collab-ext.css";
import { SettingContext } from "service/SettingsContext";

interface AppProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  MonacoEditorRef: React.MutableRefObject<any>;
}

const MonacoEditor: React.FC<AppProps> = ({ code, setCode, MonacoEditorRef }) => {
  const handleEditorDidMount = (editor: any) => {
    MonacoEditorRef.current = editor;
  };

  const { language, fontSize, theme } = useContext(SettingContext) as SettingsContextType;

  const { user } = useContext(UserContext) as UserContextTypes;
  const { guestName } = useContext(GuestNameContext) as GuestNameContextTypes;

  // if login then user that else guest name else randome name :)))
  const username = user?.name ? user.name : guestName;

  useEffect(() => {
    Convergence.connectAnonymously(CONVERGENCE_URL, username)
      .then((domain) => {
        // Now open the model, creating it using the initial data if it does not exist.
        return domain.models().openAutoCreate({
          collection: "project-caucus`",
          id: "monaco-editor-caucus",
          ephemeral: false,
          data: { text: code },
        });
      })
      .then((model) => {
        const adapter = new MonacoConvergenceAdapter(MonacoEditorRef.current, model.elementAt("text"));
        adapter.bind();
      })
      .catch((error) => {
        console.error("Could not open model ", error);
      });
  }, []);
  // console.log(MonacoEditorRef.current?.getValue());

  return (
    <div style={{ flexGrow: 1, overflow: "hidden" }}>
      <Editor
        onMount={(editor) => handleEditorDidMount(editor)}
        theme={theme}
        language={language}
        onChange={(value) => setCode(value || "")}
        options={{ wordWrap: "on", fontSize: fontSize, autoIndent: "advanced" }}
      />
    </div>
  );
};

export default MonacoEditor;
