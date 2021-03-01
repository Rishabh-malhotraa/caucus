import React, { useContext, useState, useEffect } from "react";
import { Tabs, Tab, TabPanel, TabList } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./ReactTabs.css";
import Settings from "./SettingsPage";
import ProblemList from "./ProblemList/ProblemList";
import { TabsContext } from "service/TabsContext";
import { LabelType, TabsContextTypes, QuestionDataSS } from "types";
import ProblemPage from "./ProblemPage";
import { tagsData, companiesData } from "./ProblemList/data";
import { socket } from "service/socket";

export default function TabsComponent() {
  const { tabIndex, onTabsChange, onQuestionDataChange } = useContext(TabsContext) as TabsContextTypes;
  const [companies, setCompanies] = useState<LabelType[]>([companiesData[0]]);
  const [tags, setTags] = useState<LabelType[]>([tagsData[0]]);
  const [difficulty, setDifficulty] = useState<LabelType[]>([]);

  useEffect(() => {
    socket.on("emit-selected-question", (value: QuestionDataSS) => {
      onQuestionDataChange(value);
    });
  }, []);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => onTabsChange(index)} className="tabs_root">
      <TabList style={{ background: "#252526" }}>
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
          setCompanies={setCompanies}
          setTags={setTags}
          setDifficulty={setDifficulty}
        />
      </TabPanel>
      <TabPanel>
        <Settings />
      </TabPanel>
    </Tabs>
  );
}
