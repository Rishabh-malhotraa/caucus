/* eslint-disable @typescript-eslint/no-non-null-assertion */
// .dotenv why you do me dirty like this D:
import dotenv from "dotenv";
dotenv.config();

export const PROD: boolean = JSON.parse(process.env.PROD || "false");

export const port = parseInt(<string>process.env.PORT) || 5000;

export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

export const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

export const COOKIE_KEYS = [process.env.COOKIE_KEYS || "password"];

export const JDOODLE_URL = process.env.JDOODLE_URL || "https://api.jdoodle.com/v1/execute";

// check if URI is correct for you format
// postgresql://<User>:<Passward>@<host-name>:<port-number>/<db-name>s
export const DATABASE_URL = process.env.DATABASE_URL || "postgresql://localhost:5432/caucus_db";

export const GITHUB_KEY = {
  clientID: process.env.GITHUB_KEY_CLIENTID || " ",
  clientSecret: process.env.GITHUB_KEY_CLIENTSECRET || " ",
};

export const GOOGLE_KEY = {
  clientID: process.env.GOOGLE_KEY_CLIENTID || " ",
  clientSecret: process.env.GOOGLE_KEY_CLIENTSECRET || " ",
};

export const TWITTER_KEY = {
  consumerKey: process.env.TWITTER_KEY_CONSUMERKEY || " ",
  consumerSecret: process.env.TWITTER_KEY_CONSUMERSECRET || " ",
};

export const JDOODLE = {
  clientID: process.env.JDOODLE_CLIENTID,
  clientSecret: process.env.JDOOLDE_CLIENTSECRET,
};
