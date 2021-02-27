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
export interface PostJDoodle {
  script: string;
  language: string;
  versionIndex: string;
  clientId: string;
  stdin: string;
  clientSecret: string;
}

export interface Question {
  question_id: int;
  title: string;
  question_title: string;
  problem_url: string;
  difficulty_level: int;
  difficulty: string;
}

export interface QuestionData {
  question_id: int;
  question: string;
}

export interface Companies {
  question_id: int;
  companies: string[];
}
export interface Tags {
  question_id: int;
  tags: string[];
}
