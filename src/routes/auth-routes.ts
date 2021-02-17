import { CLIENT_DASHBOARD_URL, CLIENT_LOGIN_URL } from "../keys";
import express from "express";
import passport from "passport";

const router = express.Router();
import "../service/passport";

// auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_LOGIN_URL);
});

// auth with google+
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    successRedirect: CLIENT_DASHBOARD_URL,
    failureRedirect: "/api/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));
router.get(
  "/github/redirect",
  passport.authenticate("github", {
    successRedirect: CLIENT_DASHBOARD_URL,
    failureRedirect: "/api/login/failed",
  })
);

// auth with twitter
router.get("/twitter", passport.authenticate("twitter", { scope: ["profile"] }));
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_DASHBOARD_URL,
    failureRedirect: "/api/login/failed",
  })
);

export default router;
