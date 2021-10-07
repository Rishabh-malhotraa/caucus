import React from "react";
import { SettingsContextType } from "types";
import { socket } from "service/socket";
export const SettingContext = React.createContext<SettingsContextType | null>(null);

const SettingsProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [language, setLanguage] = React.useState<string>("text/x-c++src");
  const [fontSize, setFontSize] = React.useState<number>(18);
  const [theme, setTheme] = React.useState<string>("material-darker");
  const [keybinds, setKeybinds] = React.useState<string>("sublime");

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

  const handleKeybindsChange = (value: string) => {
    setKeybinds(value);
  };

  return (
    <SettingContext.Provider
      value={{
        language,
        fontSize,
        theme,
        keybinds,
        handleLanguageChange,
        handleFontSizeChange,
        handleThemeChange,
        handleKeybindsChange,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingsProvider;
