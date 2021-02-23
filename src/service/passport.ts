import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as GithubStrategy } from "passport-github";
import { GITHUB_KEY, GOOGLE_KEY, TWITTER_KEY } from "../config.keys";
import db from "./db_connection";
import chalk from "chalk";

const date = new Date().toISOString();
const dummyImage = "https://stylizedbay.com/wp-content/uploads/2018/02/unknown-avatar.jpg";

passport.serializeUser((user: any, done) => {
  // console.log("user down at serialize");
  // console.log(user);
  done(null, user.user_id);
});

passport.deserializeUser(async (user_id, done) => {
  try {
    const user = await db.query("SELECT * FROM oauth WHERE user_id = $1", [user_id]);
    done(null, user.rows[0]);
  } catch (err) {
    console.error(err);
  }
});

passport.use(
  new GithubStrategy(
    {
      // options for github strategy
      clientID: GITHUB_KEY.clientID,
      clientSecret: GITHUB_KEY.clientSecret,
      callbackURL: "/auth/github/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      try {
        const currentUser = await (await db.query("SELECT * FROM oauth WHERE user_id= $1", [profile.id])).rows[0];
        if (currentUser) {
          done(null, currentUser);
        } else {
          // if not, create user in our db
          const newUser = await db.query(
            "INSERT INTO oauth (user_id, name, image_link, create_time, oauth_provider, access_token, refresh_token) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [profile.id, profile.displayName, profile.photos ? profile.photos[0].value : dummyImage, date, profile.provider, accessToken, refreshToken]
          );
          done(null, newUser);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

// Goolge Strategy to Login a user

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_KEY.clientID,
      clientSecret: GOOGLE_KEY.clientSecret,
      callbackURL: "/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await (await db.query("SELECT * FROM oauth WHERE user_id= $1", [profile.id])).rows[0];
        if (currentUser) {
          done(undefined, currentUser);
        } else {
          const newUser = await db.query(
            "INSERT INTO oauth (user_id, name, image_link, create_time, oauth_provider, access_token, refresh_token) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [profile.id, profile.displayName, profile.photos ? profile.photos[0].value : dummyImage, date, profile.provider, accessToken, refreshToken]
          );
          done(undefined, newUser);
        }
      } catch (err) {
        console.error(err);
        done(err);
      }
    }
  )
);

// TWITTER Strategy to Login as a user

passport.use(
  new TwitterStrategy(
    {
      consumerKey: TWITTER_KEY.consumerKey,
      consumerSecret: TWITTER_KEY.consumerSecret,
      callbackURL: "/auth/twitter/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await (await db.query("SELECT * FROM oauth WHERE user_id= $1", [profile.id])).rows[0];
        if (currentUser) {
          done(null, currentUser);
        } else {
          const newUser = await db.query(
            "INSERT INTO oauth (user_id, name, image_link, create_time, oauth_provider, access_token, refresh_token) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [profile.id, profile.displayName, profile.photos ? profile.photos[0].value : dummyImage, date, profile.provider, accessToken, refreshToken]
          );
          done(null, newUser);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);
