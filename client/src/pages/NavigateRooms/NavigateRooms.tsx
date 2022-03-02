import React, { useState, useContext, useEffect } from "react";
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Theme,
  Tooltip,
  Zoom,
  withStyles,
} from "@material-ui/core";
import axios from "axios";
import { UserContext } from "service/UserContext";
import { UserContextTypes } from "types";
import { Link, Redirect } from "react-router-dom";
import { CLIENT_URL, PUBLIC_ROOM as pr, SERVER_URL } from "config.keys";
import styles from "./NavigateRooms.module.css";
import generate from "project-name-generator";
import { useSnackbar } from "notistack";
import { useLocation } from "react-router-dom";
import Logo from "assets/caucus-logo.png";

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
  const { enqueueSnackbar } = useSnackbar();
  const { user, logoutUserInfo } = useContext(UserContext) as UserContextTypes;
  const [link, setLink] = useState("");
  const [click, setClick] = useState(false);
  const [backToLoginPage, setBackToLoginPage] = useState(false);
  const PUBLIC_ROOM = pr[Math.floor(Math.random() * pr.length)];
  const location = useLocation();

  useEffect(() => {
    const tempLocation = location.state;
    //@ts-ignore
    let showNotification = tempLocation === undefined ? false : tempLocation.showNotification ? true : false;
    if (showNotification) enqueueSnackbar("the room you want to enter is full", { variant: "warning" });
  }, []);

  const logoutUser = async () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("name");
    localStorage.removeItem("image_link");
    const response = await axios.get(`${SERVER_URL}/api/logout`);
    logoutUserInfo();
    setBackToLoginPage(true);
  };

  return (
    <>
      <div className={styles.root}>
        <Paper elevation={5} className={styles.toolbar}>
          <div className={styles.toolbarHeading}>
            <span>
              <img src={Logo} width="55x" height="55x"></img>
            </span>
            <span className={styles.toolbarText}>Caucus</span>
          </div>
          <div className={styles.avatarFlex}>
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
          <h1 className={styles.heading}>Join a Private Room</h1>
          <Grid item className={styles.textfield}>
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
          <Grid item className={styles.createRoom}>
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
    </>
  );
};

export default NavigateRoom;
