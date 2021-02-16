import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import cors from "cors";
import chalk from "chalk";

interface MessageProps {
  messages: string[];
  id: string;
}

const printUser = (socket: Socket) => {
  const x = socket.id.slice(0, 5);
  console.log(chalk.greenBright(`A user ${x}  connected`));
};

const app = express();
const port = 5000;

const httpServer = new http.Server(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "https://localhost:300",
  })
);

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

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/pages/index.html");
});

httpServer.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// socket.on("join-room", (roomName: string, callback: Function) => {
//   socket.join(roomName);
//   // okay i see what this is now
//   // once someone joins a room we want to do something about it right -- so the traditional way to to emit a eveent which was created in the client side and that even does something but a more neat way of doing the same would be to just pass a callback function as an arugument and we pass arguments int that callback function and run that function
//   callback(messages[roomName])
//   socket.emit('joined')
// });
