import { CLIENT_URL } from "../config.keys";
import { Server, Socket } from "socket.io";
import { ServerType } from "../index";
import { MessageProps, UserInfo } from "../types";
import chalk from "chalk";

const chatService = (httpServer: ServerType): void => {
  const io = new Server(httpServer, {
    cors: {
      origin: CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  /**
   * 1. On Connection save the socketid in a map along with the details
   * 2. When you join a room you do the join room manupilation roomID -> players and player to player
   * 3. on message send by as socket only to the person which is in the hashmap
   */

  const socketToRoom: Record<string, string> = {};
  const userInfoMap: Record<string, UserInfo> = {};

  // remember we want socket-id name and url link
  io.on("connection", (socket: Socket) => {
    console.log(`A user ${chalk.green(socket.id.slice(0, 5))} conmnection`);

    socket.on("join-room", (userInfo: UserInfo) => {
      socket.emit("sid", socket.id);
      const { roomID } = userInfo;
      socketToRoom[socket.id] = roomID;
      userInfoMap[socket.id] = userInfo;
      const usersInRoom = io.sockets.adapter.rooms.get(roomID)?.size;

      // adding people to rooms
      if (!usersInRoom || usersInRoom < 2) {
        socket.join(roomID);
        socket.broadcast.to(roomID).emit("new-user-joined", userInfoMap[socket.id]);
      } else {
        socket.emit("room-full");
        return;
      }
    });

    // --------------VOICE CHAT---------------------------
    socket.on("callUser", (data) => {
      console.log("call-user" + chalk.yellowBright(JSON.stringify(data)));
      socket.broadcast.to(data.roomID).emit("someones-calling", { signal: data.signalData });
    });

    socket.on("acceptCall", (data) => {
      console.log("accecpt-call" + chalk.magentaBright(JSON.stringify(data)));
      socket.broadcast.to(data.roomID).emit("callAccepted", data.signal);
    });
    // --------------VOICE CHAT---------------------------

    // --------------CHAT MESSAGES ---------------------------
    socket.on("send-message", (body: MessageProps) => {
      const roomID = body.userInfo.roomID;
      body.socketID = socket.id;
      socket.broadcast.to(roomID).emit("message", body);
    });
    // ---------------CHAT MESSAGES ---------------------------

    // ---------------OUTPUT FILE ---------------------------
    socket.on("emit-input-data", (props) => {
      const roomID = props.roomID;
      socket.broadcast.to(roomID).emit("input-data", props.data);
    });

    // ---------------OUTPUT FILE ---------------------------

    // ---------------QUESTION SELECTED ---------------------------

    socket.on("selected-question", (props) => {
      const roomID = props.roomID;
      socket.broadcast.to(roomID).emit("change-question", props.data);
    });

    // ---------------QUESTION SELECTED ---------------------------

    // ------------DISCONNECTION----------------
    socket.on("disconnect", () => {
      const roomID = socketToRoom[socket.id];
      const tempData = userInfoMap[socket.id];

      delete socketToRoom[socket.id];
      delete userInfoMap[socket.id];

      socket.broadcast.in(roomID).emit("user-left", tempData);

      console.log(`A user ${chalk.redBright(socket.id.slice(0, 5))}  disconnected`);
    });
    // --------------DISCONNECTION--------------
  });
};

export default chatService;
