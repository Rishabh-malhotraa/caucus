import io from "socket.io-client";
import { SERVER_URL } from "config.keys";

export const socket = io(SERVER_URL);
