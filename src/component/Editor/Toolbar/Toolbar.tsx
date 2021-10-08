import React, { useContext, useEffect, FC } from "react";
import { Tab, TabList } from "react-tabs";
import { socket } from "service/socket";
import { SettingContext } from "service/SettingsContext";
import { SettingsContextType } from "types";
import { MenuItem, Select } from "@material-ui/core";
import { useRoomID } from "service/RoomIdContext";
import './Toolbar.css'
import { expand, compress } from '../../../assets/svgIcons'

const EditorToolbar = () => {
  const { language, handleLanguageChange, screenSize, handleScreenChange } = useContext(SettingContext) as SettingsContextType;
  const { roomID } = useRoomID();

  useEffect(() => {
    socket.on("emit-programming-language", (inputData: string) => {
      handleLanguageChange(inputData, roomID, false);
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
      className={`tone2 ${screenSize === "fullScreen" && "toolbar"}`}
    >
      <Tab>
        <Select
          labelId="langauge-select"
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value as string, roomID, true)}
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
            handleScreenChange("fullScreen");
          }}
        >
          {expand()}
        </Tab>
      )}
      {screenSize === "fullScreen" && (
        <Tab
          onClick={() => {
            handleScreenChange("normal");
          }}
        >
          {compress()}
        </Tab>
      )}
    </TabList>
  );
};

export default EditorToolbar;
