export interface OAUTH_TABLE {
  id: number;
  user_id: string;
  name: string;
  image_link: string;
  create_time: string;
  oauth_provider: string;
  access_token: string;
  refresh_token?: string;
}

export interface UserInfo {
  name: string;
  image_link: string;
  roomID: string;
}

export interface MessageProps {
  messages: string[];
  userInfo: UserInfo;
  socketID: strimg;
}
export interface PostJSDoodleResponse {
  output: string;
  statusCode: string;
  memeory: string;
  cpuTime: string;
  error?: string;
}
