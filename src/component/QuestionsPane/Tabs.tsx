import React, { useContext, useState, useEffect, FC } from "react";
import { Tabs, Tab, TabPanel, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./ReactTabs.css";
import Settings from "./SettingsPage";
import ProblemList from "./ProblemList/ProblemList";
import { TabsContext } from "service/TabsContext";
import { LabelType, TabsContextTypes, QuestionDataSS, ScrappedDataType } from "types";
import ProblemPage from "./ProblemPage/ProblemPage";
import { tagsData, companiesData } from "./ProblemList/data";
import { socket } from "service/socket";
import { useParams } from "react-router-dom";

interface Props {
  theme: string;
}
const TabsComponent:FC<Props> = ({theme}) => {
  const { id: roomID } = useParams<Record<string, string>>();
  const { tabIndex, onTabsChange, onQuestionDataChange, handleScrappedData } = useContext(
    TabsContext
  ) as TabsContextTypes;
  const [companies, setCompanies] = useState<LabelType[]>([companiesData[0]]);
  const [tags, setTags] = useState<LabelType[]>([tagsData[0]]);
  const [difficulty, setDifficulty] = useState<LabelType[]>([]);
  const [url, setUrl] = useState<string>("https://codeforces.com/problemset/problem/1217/B");

  useEffect(() => {
    socket.on("emit-selected-question", (value: QuestionDataSS) => {
      onQuestionDataChange(value);
    });

    socket.on("emit-codeforces", (value: ScrappedDataType) => {
      handleScrappedData(value, roomID, false);
    });
  }, []);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => onTabsChange(index)} className="tabs_root">
      <TabList style={{ background: "#252526" }} className="tone2 section1-nav react-tabs__tab-list">
        <Tab>Problem</Tab>
        <Tab>Problem List</Tab>
        <Tab>Settings</Tab>
      </TabList>
      <TabPanel>
        <ProblemPage />
      </TabPanel>
      <TabPanel style={{ flexGrow: 1 }}>
        <ProblemList
          companies={companies}
          tags={tags}
          difficulty={difficulty}
          url={url}
          theme={theme}
          setCompanies={setCompanies}
          setTags={setTags}
          setDifficulty={setDifficulty}
          setUrl={setUrl}
        />
      </TabPanel>
      <TabPanel>
        <Settings />
      </TabPanel>
    </Tabs>
  );
}

export default TabsComponent