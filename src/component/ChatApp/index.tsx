import React, { useState, useEffect, useRef } from 'react';
import { socket } from 'service/socket';
import ChatMsg from './ChatMessage';
import chalk from 'chalk';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      paddding: '1rem',
      height: 'inherit',
    },
    formStyle: {
      background: 'rgba(0, 0, 0, 0.15)',
      padding: '0.25rem',
      display: 'flex',
      boxSizing: 'border-box',
      backdropFilter: 'blur(10px)',
    },
    inputStyle: {
      border: 'none',
      padding: '0 1rem',
      flexGrow: 1,
      borderRadius: '2rem',
      width: '100%',
      margin: '0.25rem',
      height: '2rem',
      '&:focus': {
        outline: 'none',
      },
    },
    formButton: {
      background: '#333',
      border: 'none',
      padding: '0 1rem',
      margin: '0.25rem',
      borderRadius: '3px',
      outline: 'none',
      color: '#fff',
    },
  })
);

interface MessageProps {
  messages: string[];
  id: string;
}

const ChatApp = () => {
  const classes = useStyles();
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const [yourID, setYourID] = useState('');
  const [message, setMessage] = useState('');
  const [body, setBody] = useState<MessageProps[]>([]);

  useEffect(() => {
    socket.on('your-id', (id: string) => {
      setYourID(id);
    });

    socket.on('message', (body: MessageProps) => {
      receivedMessages(body);
    });
    const receivedMessages = (newMessage: MessageProps) => {
      setBody((body) => {
        return [...body, newMessage];
        // if (!body.length) return [...body, newMessage];
        // else if (body[body.length - 1].id === newMessage.id) {
        //   const newbody = body;
        //   newbody[newbody.length - 1].messages.push(newMessage.messages[0]);
        //   return newbody;
        // } else {
        //   const newbody = body;
        //   newbody.push({ id: newMessage.id, messages: newMessage.messages });
        //   return newbody;
        // }
      });
    };
  }, []);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;
    const messageObject: MessageProps = {
      id: yourID,
      messages: [message],
    };
    setMessage('');
    socket.emit('send-message', messageObject);
  };

  useEffect(() => {
    if (chatBoxRef.current) chatBoxRef.current.scrollIntoView();
  }, [body]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          height: 'inherit',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            margin: '1rem',
            flexGrow: 1,
          }}
        >
          <h1>MESSENGER</h1>
          {body.map((element, index) => {
            if (element.id === yourID) {
              return (
                <ChatMsg
                  key={index}
                  avatar={''}
                  side={'right'}
                  messages={[...element.messages]}
                />
              );
            }
            return <ChatMsg key={index} messages={[...element.messages]} />;
          })}
        </div>
        <div style={{}} ref={chatBoxRef}>
          <form
            onSubmit={sendMessage}
            id="chat-form"
            className={classes.formStyle}
          >
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
