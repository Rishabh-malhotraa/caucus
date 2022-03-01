import React, { useState } from "react";
import { UserInfoType, UserContextTypes, OauthResponse } from "types";

export const UserContext = React.createContext<UserContextTypes | null>(null);

const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
  const retrived_name = localStorage.getItem("name");
  const retrived_image_link = localStorage.getItem("image_link");

  const name = retrived_name ? JSON.parse(retrived_name) : "";
  const image_link = retrived_image_link ? JSON.parse(retrived_image_link) : undefined;

  const [user, setUser] = useState<UserInfoType>({
    name: name,
    image_link: image_link,
    isLoggedIn: false,
  });

  const saveUserInfo = (data: OauthResponse, isLoggedIn: boolean) => {
    const { cookies, user } = data;
    if (user) {
      const { name, image_link } = user;
      setUser({ name, image_link, isLoggedIn, cookies });
    } else {
      setUser({ isLoggedIn });
    }
  };
  const logoutUserInfo = () => {
    setUser({ isLoggedIn: false });
  };

  return (
    <UserContext.Provider value={{ user, saveUserInfo, logoutUserInfo }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
