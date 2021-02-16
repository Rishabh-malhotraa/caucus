import { underline } from "chalk";
import express from "express";
import { Router } from "express";

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
  }
  return res.status(200).json({
    isLoggedIn: "true",
    message: "User is logged in",
    user: req.user,
    cookies: req.cookies,
  });
});

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      isLoggedIn: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    isLoggedIn: false,
    message: "user failed to authenticate.",
  });
});
