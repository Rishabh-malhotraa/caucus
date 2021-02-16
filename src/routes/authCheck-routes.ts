import { Router, Request, Response, NextFunction } from "express";
import { CLIENT_LOGIN_URL } from "../keys";

const router = Router();

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
    // res.redirect(CLIENT_LOGIN_URL);
  } else {
    next();
  }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
router.get("/", authCheck, (req: Request, res: Response) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies,
  });
});

export default router;
