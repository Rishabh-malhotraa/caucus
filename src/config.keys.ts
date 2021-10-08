export const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5000";
export const CLIENT_URL = process.env.REACT_APP_CLIENT_URL || "http://localhost:3000";
export const CDRT_SERVER = process.env.REACT_APP_CRDT_SERVER || "ws://localhost:1234";
export const PUBLIC_ROOM = ["public-room1", "public-room2", "public-room3", "public-room4", "public-room5"];
export const IS_DISABLED = process.env.REACT_APP_NETLIFY == "false" ? false : true;
