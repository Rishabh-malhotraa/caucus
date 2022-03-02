import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { Strategy as GithubStrategy } from "passport-github";
import { GITHUB_KEY, GOOGLE_KEY, TWITTER_KEY } from "../config.keys";
import knex from "./db_connection";
import { SERVER_URL } from "../config.keys";
import { OAUTH_TABLE } from "../types";
const date = new Date().toISOString();

passport.serializeUser((user: any, done) => {
  console.log("inside serialzie");
  console.log(user);
  done(null, user);
});

passport.deserializeUser(async (response: OAUTH_TABLE, done) => {
  console.log("inside derserialze");
  console.log(response);
  try {
    const userRows = await knex<OAUTH_TABLE>("oauth").select().where({ user_id: response.user_id });
    const user = userRows[0];
    done(null, user);
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
      callbackURL: `${SERVER_URL}/auth/github/redirect`,
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      try {
        const currentUserRows = await knex<OAUTH_TABLE>("oauth").select().where({ user_id: profile.id });
        const currentUser = currentUserRows[0];

        if (currentUser) {
          done(null, currentUser);
        } else {
          // if not, create user in our db
          const newUser = await knex<OAUTH_TABLE>("oauth")
            .insert({
              user_id: profile.id,
              name: profile.displayName,
              image_link: profile.photos ? profile.photos[0].value : "",
              create_time: date,
              oauth_provider: profile.provider,
              access_token: accessToken,
              refresh_token: refreshToken,
            })
            .returning("*");

          done(null, newUser[0]);
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
      callbackURL: `${SERVER_URL}/auth/google/redirect`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUserRows = await knex<OAUTH_TABLE>("oauth").select().where({ user_id: profile.id });
        const currentUser = currentUserRows[0];
        console.log("inside google");
        console.log(currentUser);
        if (currentUser) {
          done(undefined, currentUser);
        } else {
          const newUser = await knex<OAUTH_TABLE>("oauth")
            .insert({
              user_id: profile.id,
              name: profile.displayName,
              image_link: profile.photos ? profile.photos[0].value : "",
              create_time: date,
              oauth_provider: profile.provider,
              access_token: accessToken,
              refresh_token: refreshToken,
            })
            .returning("*");

          done(undefined, newUser[0]);
        }
      } catch (err) {
        console.error(err);
        done(err as Error);
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
      callbackURL: `${SERVER_URL}/auth/twitter/redirect`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUserRows = await knex<OAUTH_TABLE>("oauth").select().where({ user_id: profile.id });
        const currentUser = currentUserRows[0];

        if (currentUser) {
          done(null, currentUser);
        } else {
          const newUser = await knex<OAUTH_TABLE>("oauth")
            .insert({
              user_id: profile.id,
              name: profile.displayName,
              image_link: profile.photos ? profile.photos[0].value : "",
              create_time: date,
              oauth_provider: profile.provider,
              access_token: accessToken,
              refresh_token: refreshToken,
            })
            .returning("*");

          done(null, newUser[0]);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);
