import React, { useState, useEffect, useRef } from "react";
import { socket } from "service/socket";
import ChatMsg from "./ChatMessage";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { UserInfoSS } from "types";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddding: "1rem",
      height: "inherit",
    },
    formStyle: {
      background: "rgba(0, 0, 0,0.4)",
      padding: "0.25rem",
      display: "flex",
      boxSizing: "border-box",
      backdropFilter: "blur(10px)",
    },
    inputStyle: {
      padding: "0 1rem",
      flexGrow: 1,
      borderRadius: "2rem",
      width: "100%",
      margin: "0.25rem",
      height: "2rem",
      backgroundColor: "#1A1D1E",
      color: "whitesmoke",
      border: "1px solid #3e3e42",
      "&:focus": {
        outline: "none",
        border: "1px solid #0055bb",
      },
    },
    formButton: {
      background: "#333",
      border: "none",
      padding: "0 1rem",
      margin: "0.25rem",
      borderRadius: "3px",
      outline: "none",
      color: "#fff",
    },
  })
);

interface MessageProps {
  messages: string[];
  socketID: string;
  userInfo: UserInfoSS;
}

const ChatApp = ({ userInfo, socketID }: { userInfo: UserInfoSS; socketID: string }) => {
  const classes = useStyles();
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState("");
  const [body, setBody] = useState<MessageProps[]>([]);

  useEffect(() => {
    socket.on("message", (body: MessageProps) => {
      receivedMessages(body);
    });
    const receivedMessages = (newMessage: MessageProps) => {
      setBody((body) => {
        return [...body, newMessage];
      });
    };
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    const messageObject: MessageProps = {
      messages: [message],
      socketID: socketID,
      userInfo: userInfo,
    };
    setBody((body) => {
      return [...body, messageObject];
    });
    setMessage("");
    socket.emit("send-message", messageObject);
  };

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollIntoView();
  }, [body]);

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "inherit",
          flexDirection: "column",
        }}
      >
        <h1
          style={{ margin: "0px 0px 8px 0px", padding: "4px", backgroundColor: "#252526", fontWeight: 600 }}
        >
          MESSENGER
        </h1>
        <div style={{ flexGrow: 1, margin: "1rem" }}>
          {body.map((element, index) => {
            if (element.socketID === socketID) {
              return (
                <ChatMsg
                  key={index}
                  avatar={element.userInfo.image_link}
                  side={"right"}
                  messages={[...element.messages]}
                />
              );
            }
            return (
              <ChatMsg key={index} messages={[...element.messages]} avatar={element.userInfo.image_link} />
            );
          })}
        </div>
        <div style={{}} ref={chatBoxRef}>
          <form onSubmit={sendMessage} id="chat-form" className={classes.formStyle}>
            <input
              className={classes.inputStyle}
              autoComplete="off"
              placeholder="Start Chatting..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
