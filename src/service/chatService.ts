import socketio from "socket.io";
import { ServerOptions } from "http";
import { CLIENT_URL } from "../keys";
import { Server, Socket } from "socket.io";
import { ServerType } from "../index";
import { MessageProps } from "../types";
import chalk from "chalk";

const printUser = (socket: Socket) => {
  const x = socket.id.slice(0, 5);
  console.log(chalk.greenBright(`A user ${x}  connected`));
};

const chatService = (httpServer: ServerType): void => {
  const io = new Server(httpServer, {
    cors: {
      origin: CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });
  const notification = {
    name: "Rishabh",
    isConnected: true,
  };

  const users = [];
  // const server =
  io.on("connection", (socket: Socket) => {
    socket.broadcast.emit("connected", notification);

    socket.on("join-server", (username: string) => {
      const user = {
        username,
        id: socket,
      };
      users.push(user);
    });

    socket.emit("your-id", socket.id);
    printUser(socket);
    socket.on("send-message", (body: MessageProps) => {
      console.log(chalk.magenta(JSON.stringify(body)));
      io.emit("message", body);
      console.log(socket.id.slice(0, 5) + " messages :-  " + body.messages.pop());
    });

    socket.on("disconnect", () => {
      socket.broadcast.emit("disconnected", { ...notification, isConnected: false });
      console.log(chalk.redBright(`A user ${socket.id.slice(0, 5)}  disconnected`));
    });

    // who am I as a caller
    socket.on("offer", (payload: Record<string, string>) => {
      io.to(payload.target).emit("offer", payload);
    });
    // to who am I joining this call

    socket.on("answer", (payload) => {
      io.to(payload.target).emit("answer", payload);
    });

    socket.on("ice-candidate", (incoming) => {
      io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });
  });
};

export default chatService;
