import express from "express";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import chalk from "chalk";
import { COOKIE_KEYS, port, CLIENT_URL } from "./keys";
import authRoutes from "./routes/auth-routes";
import apiRoutes from "./routes/api-routes";
import cookieParser from "cookie-parser";

const app = express();

// app.set("view engine", "ejs");

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

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(port, () => console.log(chalk.blueBright(`listening to port ${port}`)));
