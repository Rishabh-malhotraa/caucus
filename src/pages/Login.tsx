import React from 'react';
import classes from 'styles/login.module.css';
import Particles from 'react-particles-js';
import Button from '@material-ui/core/Button';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';

import {
  GoogleLoginButton,
  GithubLoginButton,
  TwitterLoginButton,
} from 'react-social-login-buttons';

const LoginII = () => {
  return (
    <div className={classes['root']}>
      <Particles
        height="100vh"
        width="100vw"
        params={{
          particles: {
            number: {
              value: 260,
              density: {
                enable: true,
              },
            },
            size: {
              value: 3,
              random: true,
              anim: {
                speed: 4,
                size_min: 0.3,
              },
            },
            line_linked: {
              enable: false,
            },
            move: {
              random: true,
              speed: 1,
              direction: 'top',
              out_mode: 'out',
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: 'bubble',
              },
              onclick: {
                enable: true,
                mode: 'repulse',
              },
            },
            modes: {
              bubble: {
                distance: 50,
                duration: 2,
                size: 0,
                opacity: 0,
              },
              repulse: {
                distance: 400,
                duration: 4,
              },
            },
          },
        }}
      />
      <div className={classes['login-box']}>
        <div className={classes['login-box-formbox']}>
          <div className={classes['login-box-signup']}>
            Don't have an account? <a href="#">Sign Up</a>
          </div>
          <div className={classes['login-box-login']}>
            <h1>Welcome to RTCE</h1>
            <p>
              <i>A real Time collaborative editor with embeded compiler</i>
            </p>
            <form action="#">
              <div>
                <label htmlFor="email"> Guest Name</label>
                <input
                  type="email"
                  name="email"
                  className={classes['input-email']}
                />
              </div>
              <div>
                <input
                  type="button"
                  defaultValue="Login as a Guest"
                  className={classes['btn']}
                />
              </div>
            </form>
            <div className={classes['alternate-text']}>Or sign in with</div>

            {/* <GoogleLoginButton />
            <GithubLoginButton />
            <TwitterLoginButton /> */}
            <div className={classes['alternate-boxes']}>
              <Button variant="outlined" className={classes['alternate-box']}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={[
                    classes['icon'],
                    classes['icon-tabler'],
                    classes['icon-tabler-brand-facebook'],
                  ].join(' ')}
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
                </svg>
              </Button>
              <Button variant="outlined" className={classes['alternate-box']}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={[
                    classes['icon'],
                    classes['icon-tabler'],
                    classes['icon-tabler-brand-facebook'],
                  ].join(' ')}
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                </svg>
              </Button>
              <button
                className={classes['alternate-box']}
                style={{ backgroundColor: 'white' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={[
                    classes['icon'],
                    classes['icon-tabler'],
                    classes['icon-tabler-brand-apple'],
                  ].join(' ')}
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 7c-3 0 -4 3 -4 5.5c0 3 2 7.5 4 7.5c1.088 -.046 1.679 -.5 3 -.5c1.312 0 1.5 .5 3 .5s4 -3 4 -5c-.028 -.01 -2.472 -.403 -2.5 -3c-.019 -2.17 2.416 -2.954 2.5 -3c-1.023 -1.492 -2.951 -1.963 -3.5 -2c-1.433 -.111 -2.83 1 -3.5 1c-.68 0 -1.9 -1 -3 -1z" />
                  <path d="M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={classes['login-box-quotebox']}>
          <div className={classes['quote-container']}>
            <div className={classes['quote']}>Make a Dream.</div>
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

export default LoginII;
