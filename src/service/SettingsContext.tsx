import React from "react";
import { SettingsContextType } from "types";
import { socket } from "service/socket";
export const SettingContext = React.createContext<SettingsContextType | null>(null);

const SettingsProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [language, setLanguage] = React.useState<string>("cpp");
  const [fontSize, setFontSize] = React.useState<number>(16);
  const [theme, setTheme] = React.useState<string>("vs-dark");

  const handleLanguageChange = (value: string, id: string, broadcast: boolean) => {
    setLanguage(value);
    if (broadcast) socket.emit("programming-language", { data: value, roomID: id });
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  const handleFontSizeChange = (value: number) => {
    setFontSize(value);
  };

  return (
    <SettingContext.Provider
      value={{ language, fontSize, handleLanguageChange, handleFontSizeChange, theme, handleThemeChange }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingsProvider;
