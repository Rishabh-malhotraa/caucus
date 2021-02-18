import React, { useState, useRef, createRef } from 'react';
import CodeEditor from 'component/AceEditor';
import InputOutputFile from 'component/InputOutputFile';
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex';
import 'react-reflex/styles.css';
import './Room.css';
import { socket } from 'service/socket';
import { useSnackbar } from 'notistack';
import ChatApp from 'component/ChatApp';
import { SnackbarProvider } from 'notistack';

const Dashboard = () => {
  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(() => {
    const displayNotification = ({
      name,
      isConnected,
    }: Record<string, unknown>) => {
      const text = isConnected ? 'connected' : 'disconnected';
      const variantStyle = isConnected ? 'success' : 'error';
      enqueueSnackbar(`${name} is ${text}`, {
        variant: variantStyle,
      });
    };
    socket.on('connected', (data: Record<string, unknown>) => {
      displayNotification(data);
      console.log(`I'm Connected with the backend ${data}`);
    });
    socket.on('disconnected', (data: Record<string, unknown>) => {
      displayNotification(data);
      console.log(`I'm Connected with the backend ${JSON.stringify(data)}`);
    });
  }, []);

  const [text, setText] = useState('');
  const AceEditorRef = useRef(null);
  const TextAreaRef = createRef<HTMLDivElement>();
  const [rows, setRows] = useState(4);
  const resetEditorLayout = () => {
    const height = Math.floor(TextAreaRef!.current!.clientHeight);
    const adjustedRows = height > 340 ? height / 27 : height / 45;
    setRows(Math.floor(adjustedRows));

    //@ts-ignores
    AceEditorRef!.current!.editor!.resize();
  };

  return (
    <div className="root">
      <ReflexContainer orientation="horizontal">
        <ReflexElement className="header" flex={0.05}>
          Hey
        </ReflexElement>
        <ReflexElement>
          <ReflexContainer orientation="vertical">
            <ReflexElement>
              <ReflexContainer orientation="horizontal">
                <ReflexElement className="pane-color">
                  <div className="pane-content">
                    <label style={{ height: '0%' }}>
                      Left Pane <br /> Top
                      <br />
                      (splitter propagation)
                    </label>
                  </div>
                </ReflexElement>
                <ReflexSplitter
                  className="splitter splitter-horizontal"
                  propagate={true}
                />
                <ReflexElement className="pane-color">
                  <div>
                    <label style={{ height: '0%' }}>
                      Left Pane <br /> Middle
                      <br />
                      (splitter propagation)
                    </label>
                  </div>
                </ReflexElement>
                <ReflexSplitter
                  className="splitter splitter-horizontal"
                  propagate={true}
                />
                <ReflexElement className="pane-color">
                  <label style={{ height: '0%' }}>
                    Left Pane <br /> Bottom
                    <br />
                    (splitter propagation)
                  </label>
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
            {/* 1st content */}
            <ReflexSplitter
              className="splitter splitter-verticle"
              onStopResize={() => resetEditorLayout()}
            />
            <ReflexElement flex={0.5}>
              <ReflexContainer orientation="horizontal">
                <ReflexElement style={{ display: 'flex' }}>
                  <CodeEditor
                    text={text}
                    setText={setText}
                    AceEditorRef={AceEditorRef}
                  />
                </ReflexElement>
                <ReflexSplitter
                  className="splitter splitter-horizontal"
                  onStopResize={() => resetEditorLayout()}
                />
                <ReflexElement flex={0.3}>
                  <InputOutputFile rows={rows} TextAreaRef={TextAreaRef} />
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
            {/* 3rd content */}
            <ReflexSplitter
              className="splitter splitter-verticle"
              onStopResize={() => resetEditorLayout()}
            />
            <ReflexElement>
              <ReflexContainer orientation="horizontal">
                <ReflexElement>
                  <ReflexContainer orientation="vertical">
                    <ReflexElement className="pane-color">
                      <h2>Input</h2>
                    </ReflexElement>
                    <ReflexSplitter className="splitter splitter-verticle" />
                    <ReflexElement className="pane-color">
                      <h2>Output</h2>
                    </ReflexElement>
                  </ReflexContainer>
                </ReflexElement>
                <ReflexSplitter className="splitter splitter-horizontal" />
                <ReflexElement className="chat-app">
                  {/* Chat App Component */}
                  <ChatApp />
                </ReflexElement>
              </ReflexContainer>
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
        <ReflexElement className="footer" flex={0.05}>
          <div className="pane-content">
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
