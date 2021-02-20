import { CLIENT_URL } from "../config.keys";
import { Server, Socket } from "socket.io";
import { ServerType } from "../index";
import { MessageProps } from "../types";
import chalk from "chalk";

// create peer and add peer -- new peer created for that person -- peer object- array of object and socket id -- when a person joins the room
// notify all the people and
//  exsisting peers refree -- and get all of their ids and create a new peer and sending a peer for all these peopl

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

  // type UserType = Record<
  //   string,
  //   {
  //     id: string;
  //     name: string;
  //     photoUrl: string;
  //   }[]
  // >;

  const users: Record<string, string[]> = {};

  const socketToRoom: Record<string, string> = {};

  // remember we want socket-id name and url link
  io.on("connection", (socket: Socket) => {
    socket.on("join-room", (roomID: string) => {
      if (users[roomID]) {
        const length = users[roomID].length;
        if (length === 4) {
          socket.emit("room full");
          return;
        }
        users[roomID].push(socket.id);
      } else {
        users[roomID] = [socket.id];
      }
      socketToRoom[socket.id] = roomID;
      // return everyone but you in the room
      const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

      socket.broadcast.emit("all-users", usersInThisRoom);
      // socket.broadcast.emit("connected", notification); The above should act like connected notification thingy
    });

    // --------------VOICE CHAT---------------------------
    socket.on("sending-signal", (payload) => {
      io.to(payload.userToSignal).emit("user joined", {
        signal: payload.signal,
        callerID: payload.callerID,
      });
    });

    socket.on("returning-signal", (payload) => {
      io.to(payload.callerID).emit("receiving returned signal", {
        signal: payload.signal,
        id: socket.id,
      });
    });
    // --------------VOICE CHAT---------------------------

    // --------------CHAT MEASSAGES OLD---------------------------
    socket.emit("your-id", socket.id);
    socket.on("send-message", (body: MessageProps) => {
      console.log(chalk.magenta(JSON.stringify(body)));
      io.emit("message", body);
      console.log(socket.id.slice(0, 5) + " messages :-  " + body.messages.pop());
    });
    // ---------------CHAT MEASSAGES OLD---------------------------

    // ------------DISCONNECTION----------------
    socket.on("disconnect", () => {
      const roomID = socketToRoom[socket.id];
      let room = users[roomID];
      if (room) {
        room = room.filter((id) => id !== socket.id);
        users[roomID] = room;
      }
      socket.broadcast.emit("disconnected", { ...notification, isConnected: false });
      console.log(chalk.redBright(`A user ${socket.id.slice(0, 5)}  disconnected`));
    });
    // --------------DISCONNECTION--------------
  });
};

export default chatService;
