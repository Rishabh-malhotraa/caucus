import React from "react";
import { SettingsContextType } from "types";
import { socket } from "service/socket";
export const SettingContext = React.createContext<SettingsContextType | null>(null);

const SettingsProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [language, setLanguage] = React.useState<string>("text/x-c++src");
  const [fontSize, setFontSize] = React.useState<number>(18);
  const [editorTheme, setEditorTheme] = React.useState<string>("material-darker");
  const [keybinds, setKeybinds] = React.useState<string>("sublime");
  const [screenSize, setScreenSize] = React.useState<string>("normal");
  const [theme, setTheme] = React.useState<string>("dark");

  const handleLanguageChange = (value: string, id: string, broadcast: boolean) => {
    setLanguage(value);
    if (broadcast) socket.emit("programming-language", { data: value, roomID: id });
  };

  const handleEditorThemeChange = (value: string) => {
    setEditorTheme(value);
  };

  const handleFontSizeChange = (value: number) => {
    setFontSize(value);
  };

  const handleKeybindsChange = (value: string) => {
    setKeybinds(value);
  };

  const handleScreenChange = (value: string) => {
    setScreenSize(value)
  };

  const handleThemeChange = (value: string) => {
    setTheme(value);
  };

  return (
    <SettingContext.Provider
      value={{
        language,
        fontSize,
        theme,
        editorTheme,
        screenSize,
        keybinds,
        handleLanguageChange,
        handleFontSizeChange,
        handleThemeChange,
        handleEditorThemeChange,
        handleScreenChange,
        handleKeybindsChange,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingsProvider;
