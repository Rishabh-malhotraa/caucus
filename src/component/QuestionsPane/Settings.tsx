import React, { useContext } from "react";
import { FormControl, InputLabel, MenuItem, Select, withStyles } from "@material-ui/core";
import { SettingContext } from "service/SettingsContext";
import { SettingsContextType } from "types";

const Settings = () => {
  const [age, setAge] = React.useState("");
  const {
    language,
    fontSize,
    theme,
    handleFontSizeChange,
    handleLanguageChange,
    handleThemeChange,
  } = useContext(SettingContext) as SettingsContextType;

  const CssFormControl = withStyles({
    root: {
      // backgroundColor: "#3e3e42",
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
    },
  })(FormControl);

  return (
    <div>
      <CssFormControl variant="filled">
        <InputLabel id="language-select" style={{ color: "white" }}>
          Language
        </InputLabel>
        <Select
          labelId="langauge-select"
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as string)}
        >
          <MenuItem value={"cpp"}>C++</MenuItem>
          <MenuItem value={"java"}>Java</MenuItem>
          <MenuItem value={"python"}>Python</MenuItem>
          <MenuItem value={"javascript"}>JavaScript</MenuItem>
          <MenuItem value={"go"}>Go</MenuItem>
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
          <MenuItem value={"vs-dark"}>Dark Theme</MenuItem>
          <MenuItem value={"hc-black"}>High Contrast</MenuItem>
          <MenuItem value={"light"}>Light Theme</MenuItem>
        </Select>
      </CssFormControl>
    </div>
  );
};

export default Settings;
