import React, { useContext, useEffect, FC } from "react";
import { useParams } from "react-router-dom";
import { Tab, TabList } from "react-tabs";
import { socket } from "service/socket";
import { SettingContext } from "service/SettingsContext";
import { SettingsContextType } from "types";
import { MenuItem, Select } from "@material-ui/core";
import './Toolbar.css'

const expand = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="expand"
    className="svg-inline--fa fa-expand fa-w-14 MuiSvgIcon-root"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"
    ></path>
  </svg>
);

const compress = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="compress"
    className="svg-inline--fa fa-compress fa-w-14 MuiSvgIcon-root"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M436 192H312c-13.3 0-24-10.7-24-24V44c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v84h84c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12zm-276-24V44c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12v84H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24zm0 300V344c0-13.3-10.7-24-24-24H12c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12zm192 0v-84h84c6.6 0 12-5.4 12-12v-40c0-6.6-5.4-12-12-12H312c-13.3 0-24 10.7-24 24v124c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12z"
    ></path>
  </svg>
);

interface Props {
  screenSize: string;
  setScreenSize: React.Dispatch<React.SetStateAction<string>>;
}

const EditorToolbar: FC<Props> = ({ screenSize, setScreenSize }) => {
  const { language, handleLanguageChange } = useContext(SettingContext) as SettingsContextType;
  const { id } = useParams<Record<string, string>>();

  useEffect(() => {
    socket.on("emit-programming-language", (inputData: string) => {
      handleLanguageChange(inputData, id, false);
    });
  }, []);

  return (
    <TabList
      style={{
        background: "#252526",
        display: "flex",
        justifyContent: "end",
        marginBottom: "0px",
        marginTop: "0px",
        
      }}
      className={`tone2 ${screenSize==='fullScreen' && "toolbar"}`}
    >
      <Tab>
        <Select
          labelId="langauge-select"
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as string, id, true)}
        >
          <MenuItem value={"text/x-c++src"}>C++</MenuItem>
          <MenuItem value={"text/x-java"}>Java</MenuItem>
          <MenuItem value={"text/x-python"}>Python</MenuItem>
          <MenuItem value={"text/javascript"}>JavaScript</MenuItem>
          <MenuItem value={"text/x-rustsrc"}>Rust</MenuItem>
          <MenuItem value={"text/x-go"}>GoLang</MenuItem>
          <MenuItem value={"text/x-php"}>PHP</MenuItem>
          <MenuItem value={"text/x-ruby"}>Ruby</MenuItem>
          <MenuItem value={"text/x-haskell"}>Haskell</MenuItem>
        </Select>
      </Tab>
      {screenSize === "normal" && (
        <Tab
          onClick={() => {
            setScreenSize("fullScreen");
          }}
        >
          {expand}
        </Tab>
      )}
      {screenSize === "fullScreen" && (
        <Tab
          onClick={() => {
            setScreenSize("normal");
          }}
        >
          {compress}
        </Tab>
      )}
    </TabList>
  );
};

export default EditorToolbar;
