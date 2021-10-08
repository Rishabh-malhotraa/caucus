import React, { useContext } from 'react'
import './ThemeToggle.css'
import { SettingContext } from "service/SettingsContext";
import { SettingsContextType } from "types";
import { darkTheme, lightTheme }  from "../../assets/svgIcons";

const ThemeToggle = () => {
  const { theme, handleThemeChange, handleEditorThemeChange } = useContext(SettingContext) as SettingsContextType;
  return (
    <div
      className={`outer-div ${theme}`}
      onClick={() => {
        if (theme === "light") {
          handleThemeChange("dark");
          handleEditorThemeChange("material-darker")
        }
        else {
          handleThemeChange("light");
          handleEditorThemeChange("default")
        }
      }}
    >
      <span>
        {theme === "light" && darkTheme()}
        {theme === "dark" && lightTheme()}
      </span>
    </div>
  );
};

export default ThemeToggle
