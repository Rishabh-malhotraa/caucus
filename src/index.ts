import express from "express";
import cors from "cors";
import passport from "passport";
import chalk from "chalk";
import { COOKIE_KEYS, CLIENT_URL, port } from "./config.keys";
import authRoutes from "./routes/auth-routes";
import apiRoutes from "./routes/api-routes";
import cookieParser from "cookie-parser";
import http from "http";
import bodyParser from "body-parser";
import socketioService from "./service/socket-io-service";
import session from "express-session";
// import cookieSession from "cookie-session";

const app = express();
const httpServer = new http.Server(app);

app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookies from browser to pass throught
  })
);
app.use(cookieParser()); // parse cookies
// app.use(
//   cookieSession({
//     secure: false,
//     name: "session",
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [...COOKIE_KEYS],
//   })
// );

// const isDevMode = process.env.NODE_ENV === "development";
const isDevMode = false;

// 1st change.
if (!isDevMode) {
  app.set("trust proxy", 1);
}
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    name: "caucus-session",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: true,
      httpOnly: true,
      // 2nd change.
      secure: false,
    },
  })
);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
//   next();
// });

app.use(passport.initialize());
app.use(passport.session()); // deserialize cookie from the browser

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
socketioService(httpServer, app);

app.use("/", (req, res) => res.send("<h1>Server is Running :)))</h1>"));

httpServer.listen(port, () => console.log(chalk.blueBright(`Express Server listening to port ${port}`)));

export type ServerType = typeof httpServer;
