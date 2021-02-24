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
      background: "rgba(0, 0, 0, 0.15)",
      padding: "0.25rem",
      display: "flex",
      boxSizing: "border-box",
      backdropFilter: "blur(10px)",
    },
    inputStyle: {
      border: "none",
      padding: "0 1rem",
      flexGrow: 1,
      borderRadius: "2rem",
      width: "100%",
      margin: "0.25rem",
      height: "2rem",
      "&:focus": {
        outline: "none",
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
      console.log(JSON.stringify(body));
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
        <div
          style={{
            margin: "1rem",
            flexGrow: 1,
          }}
        >
          <h1>MESSENGER</h1>
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

// // do the thing here
// console.log(body);
// const n = body.length - 1;
// let cloneMessages = [...body];
// if (n < 0) {
//   setBody([...body, recievedMessage]);
//   return;
// } else {
//   const currID = recievedMessage.id;
//   const id = body[n].id;

//   if (currID === id && cloneMessages) {
//     const clonedMsg = cloneMessages[n].messages;
//     const new_messages = [...clonedMsg, ...recievedMessage.messages];
//     cloneMessages[n] = { id: currID, messages: new_messages };
//   } else {
//     cloneMessages.push({
//       id: currID,
//       messages: [recievedMessage.messages[0]],
//     });
//   }
//   setBody(cloneMessages);
