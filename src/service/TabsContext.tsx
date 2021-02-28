import React from "react";
import { TabsContextTypes, QuestionDataSS } from "types";
import { FirstQuestion } from "component/QuestionsPane/ProblemList/data";
import { socket } from "service/socket";

export const TabsContext = React.createContext<TabsContextTypes | null>(null);

const TabsProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [tabIndex, setTabIndex] = React.useState<number>(1);
  const [questionData, setQuestionData] = React.useState<QuestionDataSS>(FirstQuestion);

  const onQuestionDataChange = (value: QuestionDataSS) => {
    setQuestionData(value);
    setTabIndex(0);
  };

  const filterResponseData = (data: Record<string, any>, id: string) => {
    const { companies, tags, question } = data;

    let filteredTags = [] as string[];
    delete tags["question_id"];
    Object.entries(tags).forEach(([key, value]) => {
      if (value) filteredTags.push(key);
    });

    let filteredCompanies = [] as string[];
    delete companies["question_id"];
    Object.entries(companies).forEach(([key, value]) => {
      if (value) filteredCompanies.push(key);
    });

    const filtered_data = {
      question_data: question,
      companies: filteredCompanies,
      tags: filteredTags,
    };

    socket.emit("selected-question", { data: filtered_data, roomID: id });
    setQuestionData(filtered_data);
    setTabIndex(0);
  };

  const onTabsChange = (value: number) => setTabIndex(value);

  return (
    <TabsContext.Provider
      value={{ tabIndex, questionData, filterResponseData, onTabsChange, onQuestionDataChange }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export default TabsProvider;
