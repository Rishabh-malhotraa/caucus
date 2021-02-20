import React, { useState, useContext } from 'react';
import {
  Avatar,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import { UserContext } from 'service/UserContext';
import { UserContextTypes } from 'types';
import { Link, Redirect } from 'react-router-dom';
import { CLIENT_URL, PUBLIC_ROOM } from 'config';
import style from './NavigateRooms.module.css';
import generate from 'project-name-generator';

const NavigateRoom = () => {
  const { user } = useContext(UserContext) as UserContextTypes;
  const [link, setLink] = useState('');
  const [click, setClick] = useState(false);

  const logoutUser = async () => {
    localStorage.removeItem('isLoggedIn');
    await axios.get('/logout');
    window.location.href = `${CLIENT_URL}/login`;
  };

  return (
    <div className={style.root}>
      <Paper elevation={5} className={style.toolbar}>
        <div>RTCE</div>
        <div className={style.avatarFlex}>
          <Avatar alt={user?.name} src={user?.image_link} />
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
              startAdornment: (
                <InputAdornment position="start">
                  {CLIENT_URL + '/room/'}
                </InputAdornment>
              ),
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
          <Link
            to={`/room/${generate({ words: 2, alliterative: true }).dashed}`}
          >
            <Button variant="contained">Create a Private Room</Button>
          </Link>
          <Link to={`/room/${PUBLIC_ROOM}`}>
            <Button variant="contained">Join A Public Room</Button>
          </Link>
        </Grid>
      </Grid>
      <footer>
        Made with <span>&#9829;</span> by Rishabh Malhotra{'  '}•{'  '}
        <a
          href="https://github.com/Rishabh-malhotraa/codeforces-diary"
          target="__blank"
        >
          Github
        </a>
      </footer>
      {click ? <Redirect to={`/room/${link}`} /> : <></>}
    </div>
  );
};

export default NavigateRoom;
