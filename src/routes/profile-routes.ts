import { Router, Request, Response, NextFunction } from "express";

const router = Router();

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, (req: Request, res: Response) => {
  res.send({ user: req.user });
});

export default router;
