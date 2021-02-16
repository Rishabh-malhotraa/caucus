import express from "express";
import cors from "cors";
import passport from "passport";
import cookieSession from "cookie-session";
import chalk from "chalk";
import { COOKIE_KEYS } from "./config/keys";
import authRoutes from "./routes/auth-routes";
import profileRoutes from "./routes/profile-routes";

const app = express();

// app.set("view engine", "ejs");

app.use(cors());
app.use(
  cookieSession({
    maxAge: 10 * 24 * 60 * 60 * 1000,
    keys: [...COOKIE_KEYS],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// create home route
app.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

app.listen(5000, () => console.log(chalk.blueBright("listening to port 5000")));
