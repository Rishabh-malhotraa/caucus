import React from "react";

export interface UserInfoType {
  isLoggedIn: boolean;
  name?: string;
  image_link?: string;
  cookies?: string;
}

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

export interface OauthResponse {
  isLoggedIn: boolean;
  message: string;
  user?: OAUTH_TABLE;
  cookies?: string;
}

export interface GuestNameContextTypes {
  guestName: string;
  guestLoginClick: boolean;
  handleGuestNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isGuestNameClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent> | React.KeyboardEvent<HTMLInputElement>
  ) => void;
}

export interface SettingsContextType {
  language: string;
  fontSize: number;
  theme: string;
  keybinds: string;
  handleLanguageChange: (value: string, id: string, broadcast: boolean) => void;
  handleThemeChange: (value: string) => void;
  handleKeybindsChange: (value: string) => void;
  handleFontSizeChange: (value: number) => void;
}

export interface CodeExecutionInfoType {
  value: number;
  loading: boolean;
  inputText: string;
  outputData: {
    output: string;
    memory: number;
    cpuTime: number;
  };
  setValue: (value: number) => void;
  setLoading: (isLoading: boolean) => void;
  setInputText: (text: string) => void;
  setOutputData: (record: Record<string | any>) => void;
}
export interface RoomIDContextTypes {
  roomID: string;
  setRoomID: (id: string) => void;
}

export interface UserContextTypes {
  user: UserInfoType | undefined;
  saveUserInfo: (data: OauthResponse, isLoggedIn: boolean) => void;
  logoutUserInfo: () => void;
}
export interface StateInterface {
  appData: {
    guestName: string;
    AdminUser: UserInfoType;
    UserList: UserInfoType[];
    isLoggedIn: boolean;
  };
}

// SS -> short 😜
export interface UserInfoSS {
  name: string;
  image_link: string;
  roomID: string;
}

export interface LabelType {
  name: string;
  color: string;
  description?: string;
}

export interface QuestionListResponse {
  question_id: number;
  question_title: string;
  difficulty: string;
}

export interface QuestionDataSS {
  question_data: any;
  companies: string[];
  tags: string[];
}
export interface ScrappedDataType {
  htmlString: string;
  hostname: "codeforces.com" | "atcoder.jp";
}

export interface TabsContextTypes {
  tabIndex: number;
  showScrapped: boolean;
  questionData: QuestionDataSS;
  scrappedData: ScrappedDataType;
  filterResponseData: (data: Record<string, any>, id: string) => void;
  onTabsChange: (value: number) => void;
  handleScrappedData: (value: ScrappedDataType, id: string, broadcast: boolean) => void;
  onQuestionDataChange: (value: QuestionDataSS) => void;
}
