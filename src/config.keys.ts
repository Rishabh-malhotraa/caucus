const GITHUB_KEY = {
  clientID: "b35d16e0bfa179167917",
  clientSecret: "324c49b43c62b862d8e8da3518368a5b4de1378f",
};

const GOOGLE_KEY = {
  clientID: "145271664049-203bd95ukiik0lel9qcvr50drq5v7bfc.apps.googleusercontent.com",
  clientSecret: "1mFNkewXPeIYngupedOLjd5K",
};
const TWITTER_KEY = {
  consumerKey: "pyNhCyN5Gio2DcM6yCKA4B0qU",
  consumerSecret: "1pC1ILtST1yhtz6eYgbbuxpOayOu3lGbhDfVAVUWLXdFgzIgn4",
};

const COOKIE_KEYS = ["bitcointomoon", "chocoyogurt", "rtce-server"];

const CLIENT_URL = "http://localhost:3000";

const CLIENT_LOGIN_URL = "http://localhost:3000/";

const CLIENT_DASHBOARD_URL = "http://localhost:3000/home";

const port = 5000 || process.env.PORT;

const socket_port = port + 1;

const DB = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "youtube",
  PORT: 8080,
  DATABASE: "rtce",
};

export { GITHUB_KEY, GOOGLE_KEY, TWITTER_KEY, COOKIE_KEYS, CLIENT_DASHBOARD_URL, CLIENT_LOGIN_URL, port, socket_port, CLIENT_URL, DB };
