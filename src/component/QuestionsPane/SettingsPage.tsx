import React, { useContext, useEffect } from "react";
import { FormControl, InputLabel, MenuItem, Select, withStyles } from "@material-ui/core";
import { SettingContext } from "service/SettingsContext";
import { SettingsContextType } from "types";
import { socket } from "service/socket";
import { useRoomID } from "service/RoomIdContext";

const Settings = () => {
  const {
    language,
    fontSize,
    theme,
    keybinds,
    handleFontSizeChange,
    handleLanguageChange,
    handleThemeChange,
    handleKeybindsChange,
  } = useContext(SettingContext) as SettingsContextType;

  const { roomID: id } = useRoomID();
  const CssFormControl = withStyles({
    root: {
      width: "70%",
      margin: "1rem",
      "& svg": {
        fill: "#3f51b5",
      },

      "&:before": {
        borderColor: "#0055bb",
      },
      "&:after": {
        borderColor: "#0055bb",
      },

      "& .MuiSelect-root": {
        color: "white",
      },
      "&.MuiPaper-root": {
        backgroundColor: "black",
        color: "white",
      },
      "& > ul": {
        display: "flex",
        flexDirection: "column",
      },
    },
  })(FormControl);

  useEffect(() => {
    socket.on("emit-programming-language", (inputData: string) => {
      handleLanguageChange(inputData, id, false);
    });
  }, []);

  return (
    <div style={{ margin: "2rem 0rem" }}>
      <CssFormControl variant="filled">
        <InputLabel id="language-select" style={{ color: "white" }}>
          Language
        </InputLabel>
        <Select
          labelId="langauge-select"
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as string, id, true)}
        >
          <MenuItem value={"cpp"}>C++</MenuItem>
          <MenuItem value={"java"}>Java</MenuItem>
          <MenuItem value={"python"}>Python</MenuItem>
          <MenuItem value={"javascript"}>JavaScript</MenuItem>
          <MenuItem value={"rust"}>Rust</MenuItem>
          <MenuItem value={"go"}>GoLang</MenuItem>
          <MenuItem value={"php"}>PHP</MenuItem>
          <MenuItem value={"ruby"}>Ruby</MenuItem>
          <MenuItem value={"haskell"}>Haskell</MenuItem>
        </Select>
      </CssFormControl>

      <CssFormControl variant="filled">
        <InputLabel style={{ color: "white" }}>FontSize</InputLabel>
        <Select value={fontSize} onChange={(e) => handleFontSizeChange(e.target.value as number)}>
          <MenuItem value={10}>10px</MenuItem>
          <MenuItem value={12}>12px</MenuItem>
          <MenuItem value={14}>14px</MenuItem>
          <MenuItem value={16}>16px</MenuItem>
          <MenuItem value={18}>18px</MenuItem>
          <MenuItem value={20}>20px</MenuItem>
          <MenuItem value={22}>22px</MenuItem>
          <MenuItem value={24}>24px</MenuItem>
        </Select>
      </CssFormControl>

      <CssFormControl variant="filled">
        <InputLabel style={{ color: "white" }}>Theme</InputLabel>
        <Select value={theme} onChange={(e) => handleThemeChange(e.target.value as string)}>
          <MenuItem value={"monokai"}>Monokai</MenuItem>
          <MenuItem value={"vs"}>Light Theme</MenuItem>
          <MenuItem value={"vs-dark"}>Dark Theme</MenuItem>
          <MenuItem value={"github"}>GitHub</MenuItem>
          <MenuItem value={"hc-black"}>High contrast</MenuItem>
          <MenuItem value={"solarized-light"}>Solarized Light</MenuItem>
          <MenuItem value={"solarized-dark"}>Solarized-dark</MenuItem>
          <MenuItem value={"clouds"}>Clouds</MenuItem>
        </Select>
      </CssFormControl>

      <CssFormControl variant="filled">
        <InputLabel style={{ color: "white" }}>Keybinds</InputLabel>
        <Select value={keybinds} onChange={(e) => handleKeybindsChange(e.target.value as string)}>
          <MenuItem value={"sublime"}>Default</MenuItem>
          <MenuItem value={"vim"}>Vim</MenuItem>
          <MenuItem value={"emacs"}>Emacs</MenuItem>
        </Select>
      </CssFormControl>
    </div>
  );
};

export default Settings;
