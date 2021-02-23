import React from "react";
import { UserInfoType, UserContextTypes, OauthResponse } from "types";

export const UserContext = React.createContext<UserContextTypes | null>(null);

const UserProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [user, setUser] = React.useState<UserInfoType>({
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
