import express from "express";
import { Server, Socket } from "socket.io";
import http from "http";
import chalk from "chalk";
import cors from "cors";
// ----------------------------
// express router
const router = express.Router();

router.get("/1", (req, res) => res.send("Server is up and running"));

// ----------------------------

const PORT = process.env.PORT || 5500;

const app = express();
app.use(cors());

app.use(router);

const httpServer = new http.Server(app);
const io = new Server(httpServer);

app.get("/", (req, res) => res.send("<h1>Hey there what is up :)</h1>").status(200));

io.on("connection", (socket: Socket) => {
  console.log("Some Client Connected");

  socket.emit("get-id", socket.id);

  socket.on("disconnect", () => {
    console.log("User has left the chat!");
  });
});

httpServer.listen(PORT, () => {
  console.log(chalk.blueBright(`listening to request on port ${PORT}`));
});
