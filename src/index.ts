import express from "express";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import chalk from "chalk";
import { COOKIE_KEYS, CLIENT_URL, port } from "./config.keys";
import authRoutes from "./routes/auth-routes";
import apiRoutes from "./routes/api-routes";
import cookieParser from "cookie-parser";
import http from "http";
import bodyParser from "body-parser";
import socketioService from "./service/socket-io-service";

const app = express();
const httpServer = new http.Server(app);
socketioService(httpServer, app);

app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookies from browser to pass throught
  })
);
app.use(
  cookieSession({
    name: "session",
    maxAge: 10 * 24 * 60 * 60 * 1000,
    keys: [...COOKIE_KEYS],
  })
);

app.use(cookieParser()); // parse cookies
app.use(passport.initialize());
app.use(passport.session()); // deserialize cookie from the browser
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

app.use("/", (req, res) => res.send("<h1>Server is Running :)))</h1>"));

httpServer.listen(port, () => console.log(chalk.blueBright(`Socket-io Server listening to port ${port}`)));

export type ServerType = typeof httpServer;
