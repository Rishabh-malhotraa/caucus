import React, { useState, createRef, useRef, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import InputOutputFile from "component/InputOutputFile/InputOutputFile";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import "react-reflex/styles.css";
import style from "./Room.module.css";
import { socket } from "service/socket";
import { useSnackbar } from "notistack";
import ChatApp from "component/TextChat";
import VoiceChat from "component/VoiceChat/VoiceChat";
import { useParams } from "react-router-dom";
import { useRoomID } from "service/RoomIdContext";
import CodeMirror from "component/Editor/CodeMirrorEditor";
import clsx from "clsx";
import { GuestNameContext } from "service/GuestNameContext";
import { UserContext } from "service/UserContext";
import { UserContextTypes, GuestNameContextTypes, UserInfoSS } from "types";
import TabsPanel from "component/QuestionsPane/Tabs";
import Button from "@material-ui/core/Button";

const Dashboard = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { user } = useContext(UserContext) as UserContextTypes;
  const { guestName } = useContext(GuestNameContext) as GuestNameContextTypes;
  const CodeMirrorRef = useRef<any>();
  const TextAreaRef = createRef<HTMLDivElement>();
  const [rows, setRows] = useState(5);
  const [sid, setSid] = useState("");
  const [goBack, setGoBack] = useState(false);
  const [partnerUser, setPartnerUser] = useState<UserInfoSS>();
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const { id } = useParams<Record<string, string>>();
  const { setRoomID } = useRoomID();

  useEffect(() => {
    setRoomID(id);
  }, [id]);

  const prepareData = (): UserInfoSS => {
    return {
      name: user?.name ? user.name : guestName,
      image_link: user?.image_link ? user.image_link : "",
      roomID: id,
    };
  };

  const action = (key: any) => (
    <>
      <Button
        style={{ color: "white" }}
        onClick={() => {
          localStorage.setItem("shouldShow", JSON.stringify(false));
          closeSnackbar(key);
        }}
      >
        Don't Show Again
      </Button>
    </>
  );

  const displayNotification = (data: UserInfoSS, enter: boolean) => {
    const text = enter ? "joined the room" : "left the room";
    const variantStyle = enter ? "success" : "error";
    enqueueSnackbar(`${data.name} ${text}`, {
      preventDuplicate: true,
      variant: variantStyle,
    });
  };

  useEffect(() => {
    const retrivedKeyString = localStorage.getItem("shouldShow");
    const retrivedKey = retrivedKeyString ? JSON.parse(retrivedKeyString) : true;

    if (retrivedKey) {
      enqueueSnackbar("Open the same link in another tab to see realtime collabotation", {
        action,
      });
    }

    socket.emit("join-room", prepareData());

    socket.on("store-sid", (id: string) => setSid(id));
    socket.on("new-user-joined", (data: UserInfoSS) => {
      setPartnerUser(data);
      displayNotification(data, true);
    });

    socket.on("room-full", () => {
      setGoBack(true);
    });

    socket.on("user-left", (data: UserInfoSS) => {
      displayNotification(data, false);
    });
  }, []);

  const resetEditorLayout = () => {
    const height = Math.floor(TextAreaRef!.current!.clientHeight);
    const adjustedRows = height > 340 ? height / 27 : height / 39;
    setRows(Math.floor(adjustedRows));
    editorInstance.refresh();
  };

  return (
    <>
      <div className={style.root}>
        <ReflexContainer orientation="horizontal">
          <ReflexElement style={{ paddingTop: "1rem" }}>
            <ReflexContainer orientation="vertical">
              <ReflexElement>
                <ReflexContainer orientation="horizontal">
                  <ReflexElement className={style["pane-color"]}>
                    <TabsPanel />
                  </ReflexElement>
                </ReflexContainer>
              </ReflexElement>
              {/* End of 1st content */}
              <ReflexSplitter
                className={clsx(style.splitter, style["splitter-verticle"])}
                onStopResize={() => resetEditorLayout()}
              />
              <ReflexElement flex={0.45}>
                <ReflexContainer orientation="horizontal">
                  <ReflexElement style={{ display: "flex" }}>
                    <CodeMirror editorInstance={editorInstance} setEditorInstance={setEditorInstance} />
                  </ReflexElement>
                  <ReflexSplitter
                    className={clsx(style.splitter, style["splitter-horizontal"])}
                    onStopResize={() => resetEditorLayout()}
                  />
                  <ReflexElement flex={0.3}>
                    <InputOutputFile rows={rows} TextAreaRef={TextAreaRef} editorInstance={editorInstance} />
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
                  {/* 0.12 */}
                  <ReflexElement className={style["pane-color"]} flex={0.18}>
                    <VoiceChat params={id} user={prepareData()} partnerUser={partnerUser} />
                  </ReflexElement>
                  <ReflexSplitter className={clsx(style.splitter, style["splitter-horizontal"])} />
                  <ReflexElement className={style["chat-app"]}>
                    {/* Chat App Component */}
                    <ChatApp userInfo={prepareData()} socketID={sid} />
                  </ReflexElement>
                </ReflexContainer>
              </ReflexElement>
            </ReflexContainer>
          </ReflexElement>
          <ReflexElement className={style.footer} flex={0.028}>
            Made with <span>&#9829;</span> by Rishabh Malhotra{"  "}•{"  "}
            <a href="https://github.com/Rishabh-malhotraa/caucus" target="__blank">
              Github
            </a>
          </ReflexElement>
        </ReflexContainer>
      </div>
      {goBack ? <Redirect to={{ pathname: "/home", state: { showNotification: true } }} /> : <></>}
    </>
  );
};

export default Dashboard;
