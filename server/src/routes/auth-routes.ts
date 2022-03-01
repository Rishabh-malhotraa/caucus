import { CLIENT_URL } from "../config.keys";
import express from "express";
import passport from "passport";
const router = express.Router();

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    isLoggedIn: false,
    message: "user failed to authenticate.",
  });
});

// auth with google+
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: `${CLIENT_URL}/home`,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));
router.get(
  "/github/redirect",
  passport.authenticate("github", {
    successRedirect: `${CLIENT_URL}/home`,
    failureRedirect: "/login/failed",
  })
);

// auth with twitter
router.get("/twitter", passport.authenticate("twitter", { scope: ["profile"] }));
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: `${CLIENT_URL}/home`,
    failureRedirect: "/login/failed",
  })
);

export default router;
