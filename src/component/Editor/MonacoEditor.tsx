import React, { useEffect, useContext } from "react";
import Editor from "@monaco-editor/react";
import { Convergence } from "@convergence/convergence";
import { CONVERGENCE_URL } from "config.keys";
import MonacoConvergenceAdapter from "./MonacoAdapter";
import { GuestNameContext } from "service/GuestNameContext";
import { UserContext } from "service/UserContext";
import { GuestNameContextTypes, SettingsContextType, UserContextTypes } from "types";
import "@convergencelabs/monaco-collab-ext/css/monaco-collab-ext.css";
import { SettingContext } from "service/SettingsContext";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";

interface AppProps {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  MonacoEditorRef: React.MutableRefObject<any>;
}

const MonacoEditor: React.FC<AppProps> = ({ code, setCode, MonacoEditorRef }) => {
  const handleEditorDidMount = (editor: any) => {
    MonacoEditorRef.current = editor;
  };

  const { id: roomID } = useParams<Record<string, string>>();

  const { enqueueSnackbar } = useSnackbar();
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
          id: roomID,
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
        enqueueSnackbar(
          "Real-time collaboration won't work: unable to establish a connection with the server",
          {
            variant: "error",
          }
        );
      });
  }, []);

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
