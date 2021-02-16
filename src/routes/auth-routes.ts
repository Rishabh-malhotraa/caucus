import express from "express";
import passport from "passport";

const router = express.Router();
import "../service/passport";

// auth login page -- this would be the lofgin page URI from which the suer would login
// /auth/login  -- /auth/logout
// render a pgae with google login button you dont need to worry about this let the react router do this
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

// auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// auth with google+
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);
router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

router.get("/github", passport.authenticate("github"));
router.get("/github/redirect", passport.authenticate("github"), (req, res) => {
  res.redirect("/profile");
});

// auth with twitter
router.get("/twitter", passport.authenticate("twitter"));
router.get("/twitter/redirect", passport.authenticate("twitter"), (req, res) => {
  res.redirect("/profile");
});

export default router;
