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
      if (!usersInRoom || usersInRoom < 4) {
        socket.join(roomID);
        // here also add the peerJS ID
        socket.broadcast.to(roomID).emit("new-user-joined", userInfoMap[socket.id]);
      } else {
        socket.emit("room-full");
        return;
      }
    });

    socket.on("send-message", (body: MessageProps) => {
      const roomID = body.userInfo.roomID;
      body.socketID = socket.id;
      socket.broadcast.to(roomID).emit("message", body);
    });

    socket.on("input-data", (props) => {
      const roomID = props.roomID;
      socket.broadcast.to(roomID).emit("emit-input-data", props.data);
    });

    socket.on("programming-language", (props) => {
      const roomID = props.roomID;
      socket.broadcast.to(roomID).emit("emit-programming-language", props.data);
    });

    socket.on("selected-question", (props) => {
      const roomID = props.roomID;
      socket.broadcast.to(roomID).emit("emit-selected-question", props.data);
    });

    socket.on("codeforces", (props) => {
      const roomID = props.roomID;
      socket.broadcast.to(roomID).emit("emit-codeforces", props.data);
    });

    socket.on("code-executed", (props) => {
      const roomID = props.roomID;
      socket.broadcast.to(roomID).emit("emit-code-executed", props.data);
    });

    socket.on("disconnect", () => {
      const roomID = socketToRoom[socket.id];
      const tempData = userInfoMap[socket.id];

      delete socketToRoom[socket.id];
      delete userInfoMap[socket.id];

      socket.broadcast.in(roomID).emit("user-left", tempData);

      console.log(`A user ${chalk.redBright(socket.id.slice(0, 5))}  disconnected`);
    });
  });
};

export default chatService;
