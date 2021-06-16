/* eslint-disable @typescript-eslint/no-non-null-assertion */
// .dotenv why you do me dirty like this D:
import dotenv from "dotenv";
dotenv.config();

export const DB = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  PORT: parseInt(<string>process.env.DB_PORT),
  DATABASE: process.env.DB_DATABASE,
};

export const DATABASE_URL = process.env.DATABASE_URL!;

export const GITHUB_KEY = {
  clientID: process.env.GITHUB_KEY_CLIENTID!,
  clientSecret: process.env.GITHUB_KEY_CLIENTSECRET!,
};

export const GOOGLE_KEY = {
  clientID: process.env.GOOGLE_KEY_CLIENTID!,
  clientSecret: process.env.GOOGLE_KEY_CLIENTSECRET!,
};

export const TWITTER_KEY: Record<string, string> = {
  consumerKey: process.env.TWITTER_KEY_CONSUMERKEY!,
  consumerSecret: process.env.TWITTER_KEY_CONSUMERSECRET!,
};

export const JDOODLE = {
  clientID: process.env.JDOODLE_CLIENTID,
  clientSecret: process.env.JDOOLDE_CLIENTSECRET,
};

export const PROD: boolean = JSON.parse(process.env.PROD!);

export const port = parseInt(<string>process.env.PORT) || 5000;

export const SERVER_URL = process.env.SERVER_URL || "http:localhost:3000";

export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5000";

export const COOKIE_KEYS = [process.env.COOKIE_KEYS!];

export const JDOODLE_URL = process.env.JDOODLE_URL!;
