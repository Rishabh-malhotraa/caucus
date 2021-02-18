import React, { useContext } from 'react';
import classes from './login.module.css';
import Button from '@material-ui/core/Button';
import { GuestNameContext } from 'service/GuestNameContext';
import { GuestNameContextTypes } from 'types';
import GoogleSVG from 'assets/google.svg';
import GithubPNG from 'assets/github.png';
import TwitterPNG from 'assets/twitter.png';
import { OAUTH_URL } from 'config';
import Particles from 'component/Particles.config';
const Login = () => {
  const { name, handleOnChange } = useContext(
    GuestNameContext
  ) as GuestNameContextTypes;

  const handleLogin = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    provider: string
  ) => {
    event.preventDefault();
    window.open(OAUTH_URL.concat(provider), '_self');
  };

  return (
    <div className={classes['root']}>
      <Particles />
      <div className={classes['login-box']}>
        <div className={classes['login-box-formbox']}>
          <div className={classes['login-box-signup']}>
            Don't have an account? <a href="/login">Sign Up</a>
          </div>
          <div className={classes['login-box-login']}>
            <h1>Welcome to RTCE</h1>
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
                  value={name}
                  onChange={(e) => handleOnChange(e)}
                  placeholder="Enter your Name"
                  className={classes['input-email']}
                />
              </div>
              <div>
                <Button className={classes['btn']}>Login as a guest</Button>
              </div>
            </form>
            <div className={classes['alternate-text']}>Or Log in with</div>
            <div className={classes['alternate-boxes']}>
              <Button
                onClick={(event) => handleLogin(event, '/google')}
                variant="outlined"
                color="inherit"
                className={classes['alternate-box']}
              >
                <img src={GoogleSVG} alt="googleLogo" />
              </Button>
              <Button
                onClick={(event) => handleLogin(event, '/github')}
                variant="outlined"
                color="inherit"
                className={classes['alternate-box']}
              >
                <img
                  width="28px"
                  height="28px"
                  src={GithubPNG}
                  alt="githubLogo"
                />
              </Button>
              <Button
                onClick={(event) => handleLogin(event, '/twitter')}
                variant="outlined"
                color="inherit"
                className={classes['alternate-box']}
              >
                <img
                  src={TwitterPNG}
                  width="24px"
                  height="24px"
                  alt="twitterlogo"
                />
              </Button>
            </div>
          </div>
        </div>
        <div className={classes['login-box-quotebox']}>
          <div className={classes['quote-container']}>
            <div className={classes['quote']}>Code & Learn.</div>
            <div className={classes['quote-small']}>
              'Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
              repellendus cumque voluptatum animi, illum veniam?'
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
