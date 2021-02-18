import React from 'react';


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
  isLoggedIn: boolean,
  message: string,
  user?: OAUTH_TABLE,
  cookies?: string,
}



export interface GuestNameContextTypes {
  name: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface UserContextTypes {
  user: UserInfoType | undefined;
  saveUserInfo: (data: OauthResponse, isLoggedIn: boolean) => void
}

export interface StateInterface {
  appData: {
    guestName: string;
    AdminUser: UserInfoType;
    UserList: UserInfoType[];
    isLoggedIn: boolean;
  }
}
