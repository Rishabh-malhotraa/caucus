import React, { useContext, useState } from "react";
import classes from "./login.module.css";
import Button from "@material-ui/core/Button";
import { GuestNameContext } from "service/GuestNameContext";
import { GuestNameContextTypes } from "types";
import GoogleSVG from "assets/google.svg";
import GithubPNG from "assets/github.png";
import TwitterPNG from "assets/twitter.png";
import { SERVER_URL } from "config.keys";
import Particles from "pages/Login/Particles.config";
import Loader from "pages/LoadingAnimation/StartupAnimation";
import { Redirect } from "react-router-dom";
import { PUBLIC_ROOM as pr, IS_DISABLED } from "config.keys";

const Login = () => {
  const { guestName, handleGuestNameChange, isGuestNameClick, guestLoginClick } = useContext(
    GuestNameContext
  ) as GuestNameContextTypes;

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, provider: string) => {
    event.preventDefault();
    window.open(`${SERVER_URL}/auth/${provider}`, "_self");
  };
  const PUBLIC_ROOM = pr[Math.floor(Math.random() * pr.length)];
  return (
    <>
      <div className={classes["root"]}>
        <Particles />
        <div className={classes["login-box"]}>
          <div className={classes["login-box-formbox"]}>
            <div className={classes["login-box-signup"]}>
              Want to know how I made this?{" "}
              <a href="" onClick={(e) => e.preventDefault()}>
                Read the Blog
              </a>
            </div>
            <div className={classes["login-box-login"]}>
              <h1>Welcome to Caucus</h1>
              <p>
                <i>A real Time collaborative editor with embeded compiler</i>
              </p>
              <form action="#">
                <div>
                  <label htmlFor="username"> Guest Name</label>
                  <input
                    type="text"
                    name="username"
                    autoComplete="off"
                    value={guestName}
                    onChange={(e) => handleGuestNameChange(e)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        isGuestNameClick(e);
                      }
                    }}
                    placeholder="Enter your Name"
                    className={classes["input-email"]}
                  />
                </div>
                <div>
                  <Button className={classes["btn"]} onClick={(e) => isGuestNameClick(e)}>
                    Login as a guest
                  </Button>
                </div>
              </form>
              <div className={classes["alternate-text"]}>Or Log in with</div>
              <div className={classes["alternate-boxes"]}>
                <Button
                  disabled={IS_DISABLED}
                  onClick={(event) => handleLogin(event, "google")}
                  variant="outlined"
                  color="inherit"
                  className={classes["alternate-box"]}
                >
                  <img src={GoogleSVG} alt="googleLogo" />
                </Button>
                <Button
                  disabled={IS_DISABLED}
                  onClick={(event) => handleLogin(event, "github")}
                  variant="outlined"
                  color="inherit"
                  className={classes["alternate-box"]}
                >
                  <img width="28px" height="28px" src={GithubPNG} alt="githubLogo" />
                </Button>
                <Button
                  disabled={IS_DISABLED}
                  onClick={(event) => event.preventDefault()}
                  variant="outlined"
                  color="inherit"
                  className={classes["alternate-box"]}
                >
                  <img src={TwitterPNG} width="24px" height="24px" alt="twitterlogo" />
                </Button>
              </div>
            </div>
          </div>
          <div className={classes["login-box-quotebox"]}>
            <div className={classes["quote-container"]}>
              <div className={classes["quote"]}>Code & Learn.</div>
              <div className={classes["quote-small"]}>
                'A Real Time Collaborative Editor for practicising for coding Interviews'
              </div>
            </div>
          </div>
        </div>
      </div>
      {guestLoginClick ? <Redirect to="/room/public-room"></Redirect> : <></>}
    </>
  );
};
// Only show the animation for the very first time the user comes to the site :)
const LoginAnimation = () => {
  const [showAnimation, setShowAnimation] = useState<boolean>(true);

  const retrivedKeyString = localStorage.getItem("showAnimation");
  const retrivedKey = retrivedKeyString ? JSON.parse(retrivedKeyString) : true;

  if (showAnimation === true && retrivedKey === true)
    setTimeout(() => {
      localStorage.setItem("showAnimation", "false");
      setShowAnimation(false);
    }, 7200);

  return <>{showAnimation && retrivedKey ? <Loader /> : <Login />}</>;
};

export default LoginAnimation;
