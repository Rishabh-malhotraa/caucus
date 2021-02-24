import React, { useState, useContext } from "react";
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Theme,
  Tooltip,
  withStyles,
  Zoom,
} from "@material-ui/core";
import axios from "axios";
import { UserContext } from "service/UserContext";
import { UserContextTypes } from "types";
import { Link, Redirect } from "react-router-dom";
import { CLIENT_URL, PUBLIC_ROOM, LOGOUT_URL } from "config";
import style from "./NavigateRooms.module.css";
import generate from "project-name-generator";

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 1)",
    boxShadow: theme.shadows[2],
    fontSize: "14px",
    borderRadius: "25px",
  },
}))(Tooltip);

const NavigateRoom = () => {
  const { user, logoutUserInfo } = useContext(UserContext) as UserContextTypes;
  const [link, setLink] = useState("");
  const [click, setClick] = useState(false);
  const [backToLoginPage, setBackToLoginPage] = useState(false);

  const logoutUser = async () => {
    localStorage.removeItem("isLoggedIn");
    const response = await axios.get(LOGOUT_URL);
    logoutUserInfo();
    // window.location.href = `${CLIENT_URL}`;
    console.log(response);
    setBackToLoginPage(true);
  };

  return (
    <div className={style.root}>
      <Paper elevation={5} className={style.toolbar}>
        <div className={style.toolbarHeading}>Caucus</div>
        <div className={style.avatarFlex}>
          <LightTooltip TransitionComponent={Zoom} title={user?.name || "John Doe"} placement="bottom">
            <Avatar alt={user?.name} src={user?.image_link} />
          </LightTooltip>

          <Button
            onClick={async () => {
              await logoutUser();
            }}
          >
            Logout
          </Button>
        </div>
      </Paper>
      <Grid container direction="column">
        <h1 className={style.heading}>Join a Private Room</h1>
        <Grid className={style.textfield}>
          <TextField
            variant="outlined"
            onChange={(e) => setLink(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">{CLIENT_URL + "/room/"}</InputAdornment>,
            }}
          />
          <Button
            variant="contained"
            onClick={() => {
              setClick(link ? true : false);
            }}
          >
            Join Room
          </Button>
        </Grid>
        <Grid className={style.createRoom}>
          <Link to={`/room/${generate({ words: 2, alliterative: true }).dashed}`}>
            <Button variant="contained">Create a Private Room</Button>
          </Link>
          <Link to={`/room/${PUBLIC_ROOM}`}>
            <Button variant="contained">Join A Public Room</Button>
          </Link>
        </Grid>
      </Grid>
      <footer>
        Made with <span>&#9829;</span> by Rishabh Malhotra{"  "}•{"  "}
        <a href="https://github.com/Rishabh-malhotraa/codeforces-diary" target="__blank">
          Github
        </a>
      </footer>
      {click ? <Redirect to={`/room/${link}`} /> : <></>}
      {backToLoginPage ? <Redirect to={`/`} /> : <></>}
    </div>
  );
};

export default NavigateRoom;
