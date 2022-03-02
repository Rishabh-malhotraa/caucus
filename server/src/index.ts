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
import "./service/passport";

// import cookieSession from "cookie-session";

const app = express();
const httpServer = new http.Server(app);

app.use(
  cors({
    origin: CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type",
    credentials: true, // allow session cookies from browser to pass throught
  })
);

app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser()); // parse cookies

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: COOKIE_KEYS,
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

app.use(passport.initialize());
app.use(passport.session()); // deserialize cookie from the browser

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);
socketioService(httpServer);

app.use("/", (req, res) =>
  res.send(`
  <h1>Server is Running :)))</h1>
  <div>The website is now hosted on netlify
    <a href="https://caucus.netlify.app/">https://caucus.netlify.app/</a>
  </div>
`)
);

httpServer.listen(port, () => console.log(chalk.blueBright(`Express Server listening to port ${port}`)));

export type ServerType = typeof httpServer;
