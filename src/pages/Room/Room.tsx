import React, { useState, createRef, useRef } from "react";
import InputOutputFile from "component/InputOutputFile/InputOutputFile";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import "react-reflex/styles.css";
import style from "./Room.module.css";
import { socket } from "service/socket";
import { useSnackbar } from "notistack";
import ChatApp from "component/TextChat";
import VoiceChat from "component/VoiceChat/VoiceChat";
import { SnackbarProvider } from "notistack";
import { useParams } from "react-router-dom";
import MonacoEditor from "component/Editor/MonacoEditor";
import "@convergencelabs/monaco-collab-ext/css/monaco-collab-ext.min.css.map";
import clsx from "clsx";
const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams<Record<string, string>>();

  React.useEffect(() => {
    const displayNotification = ({ name, isConnected }: Record<string, unknown>) => {
      const text = isConnected ? "connected" : "disconnected";
      const variantStyle = isConnected ? "success" : "error";
      enqueueSnackbar(`${name} is ${text}`, {
        variant: variantStyle,
      });
    };
    socket.on("connected", (data: Record<string, unknown>) => {
      displayNotification(data);
      console.log(`I'm Connected with the backend ${data}`);
    });
    socket.on("disconnected", (data: Record<string, unknown>) => {
      displayNotification(data);
      console.log(`I'm Connected with the backend ${JSON.stringify(data)}`);
    });
  }, []);

  const [code, setCode] = useState<string>();
  const MonacoEditorRef = useRef<any>();
  const TextAreaRef = createRef<HTMLDivElement>();
  const [rows, setRows] = useState(4);
  const resetEditorLayout = () => {
    const height = Math.floor(TextAreaRef!.current!.clientHeight);
    const adjustedRows = height > 340 ? height / 27 : height / 45;
    setRows(Math.floor(adjustedRows));
    MonacoEditorRef.current.layout();
  };

  return (
    <div className={style.root}>
      <ReflexContainer orientation="horizontal">
        <ReflexElement className={style.header} flex={0.05}>
          Hey
        </ReflexElement>
        <ReflexElement>
          <ReflexContainer orientation="vertical">
            <ReflexElement>
              <ReflexContainer orientation="horizontal">
                <ReflexElement className={style["pane-color"]}>
                  <div className={style["pane-content"]}>
                    <label style={{ height: "0%" }}>
                      Left Pane <br /> Top
                      <br />
                      (splitter propagation)
                    </label>
                  </div>
                </ReflexElement>
                <ReflexSplitter
                  className={clsx(style.splitter, style["splitter-horizontal"])}
                  propagate={true}
                />
                <ReflexElement className={style["pane-color"]}>
                  <div>
                    <label style={{ height: "0%" }}>
                      Left Pane <br /> Middle
                      <br />
                      (splitter propagation)
                    </label>
                  </div>
                </ReflexElement>
                <ReflexSplitter
                  className={clsx(style.splitter, style["splitter-horizontal"])}
                  propagate={true}
                />
                <ReflexElement className={style["pane-color"]}>
                  <label style={{ height: "0%" }}>
                    Left Pane <br /> Bottom
                    <br />
                    (splitter propagation)
                  </label>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
            {/* 1st content */}
            <ReflexSplitter
              className={clsx(style.splitter, style["splitter-verticle"])}
              onStopResize={() => resetEditorLayout()}
            />
            <ReflexElement flex={0.5}>
              <ReflexContainer orientation="horizontal">
                <ReflexElement style={{ display: "flex" }}>
                  <MonacoEditor code={code} setCode={setCode} MonacoEditorRef={MonacoEditorRef} />
                </ReflexElement>
                <ReflexSplitter
                  className={clsx(style.splitter, style["splitter-horizontal"])}
                  onStopResize={() => resetEditorLayout()}
                />
                <ReflexElement flex={0.3}>
                  <InputOutputFile rows={rows} TextAreaRef={TextAreaRef} />
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
            {/* 3rd content */}
            <ReflexSplitter
              className={clsx(style.splitter, style["splitter-verticle"])}
              onStopResize={() => resetEditorLayout()}
            />
            <ReflexElement>
              <ReflexContainer orientation="horizontal">
                <ReflexElement className={style["pane-color"]} flex={0.3}>
                  <h2>Video Icons</h2>
                  <VoiceChat params={id} />
                </ReflexElement>
                <ReflexSplitter className={clsx(style.splitter, style["splitter-horizontal"])} />
                <ReflexElement className={style["chat-app"]}>
                  {/* Chat App Component */}
                  <ChatApp />
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
        <ReflexElement className={style.footer} flex={0.05}>
          <div className={style["pane-content"]}>
            <label>Footer (fixed)</label>
          </div>
        </ReflexElement>
      </ReflexContainer>
    </div>
  );
};

export const NotificationWrappedDashBoard = () => {
  return (
    <SnackbarProvider>
      <Dashboard />
    </SnackbarProvider>
  );
};

export default NotificationWrappedDashBoard;
