import { Router } from "express";
import axios from "axios";
import { JSDOODLE_URL, JSDOODLE } from "config.keys";
import getLanguageVersion from "../utils/getLanguageVersion";
const router = Router();

// we will do our re-routing from the client side just send information from here
// GET to /api/auth will return current logged in user info
router.get("/auth", (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      isLoggedIn: false,
      message: "User is not logged in.",
      user: undefined,
      cookies: undefined,
    });
  } else {
    return res.status(200).json({
      isLoggedIn: true,
      message: "User is logged in",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

// auth logout
router.get("/logout", (req, res) => {
  req.logout();
  res.send({ message: "Successfully logged out" });
});

export interface PostJSDoodle {
  script: string;
  language: string;
  versionIndex: string;
  clientId: string;
  stdin: string;
  clientSecret: string;
}

router.post("/execute", async (req, res) => {
  const { script, language, stdin } = req.body;
  if (!language || !script) {
    return res.status(401).json({
      message: "Code should not be empty and Language undefined",
    });
  }

  const response = await axios({
    method: "POST",
    url: JSDOODLE_URL,
    responseType: "json",
    data: {
      script: script,
      language: language,
      stdin: stdin,
      versionIndex: getLanguageVersion[language],
      clientID: JSDOODLE.clientID,
      clientSecret: JSDOODLE.clientSecret,
    },
  });
  res.json(response);
});

export default router;
