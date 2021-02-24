export const DB = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "youtube",
  PORT: 8080,
  DATABASE: "rtce",
};

export const GITHUB_KEY = {
  clientID: "b35d16e0bfa179167917",
  clientSecret: "324c49b43c62b862d8e8da3518368a5b4de1378f",
};

export const GOOGLE_KEY = {
  clientID: "145271664049-203bd95ukiik0lel9qcvr50drq5v7bfc.apps.googleusercontent.com",
  clientSecret: "1mFNkewXPeIYngupedOLjd5K",
};

export const TWITTER_KEY = {
  consumerKey: "pyNhCyN5Gio2DcM6yCKA4B0qU",
  consumerSecret: "1pC1ILtST1yhtz6eYgbbuxpOayOu3lGbhDfVAVUWLXdFgzIgn4",
};

export const JDOODLE = {
  clientID: "da358ecadea106b681e17e6dd1194863",
  clientSecret: "7b69d6ce85668cb6fe5dbd61d37433bf3ffe31c14fed906833faad7e2593f5ca",
};

export const port = 5000 || process.env.PORT;

export const socket_port = port + 1;

export const COOKIE_KEYS = ["bitcointomoon", "chocoyogurt", "rtce-server"];

export const CLIENT_URL = "http://localhost:3000";

export const CLIENT_LOGIN_URL = "http://localhost:3000/";

export const CLIENT_DASHBOARD_URL = "http://localhost:3000/home";

export const JDOODLE_URL = "https://api.jdoodle.com/v1/execute";
