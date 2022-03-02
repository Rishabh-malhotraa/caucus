import React from "react";
import { TabsContextTypes, QuestionDataSS, ScrappedDataType } from "types";
import { FirstQuestion, intialScrappedData } from "component/QuestionsPane/ProblemList/data";
import { socket } from "service/socket";

export const TabsContext = React.createContext<TabsContextTypes | null>(null);

const TabsProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [tabIndex, setTabIndex] = React.useState<number>(1);
  const [questionData, setQuestionData] = React.useState<QuestionDataSS>(FirstQuestion);
  const [scrappedData, setScrappedData] = React.useState<ScrappedDataType>(
    intialScrappedData as ScrappedDataType
  );
  const [showScrapped, setShowScrapped] = React.useState(false);

  const onQuestionDataChange = (value: QuestionDataSS) => {
    setShowScrapped(false);
    setQuestionData(value);
    setTabIndex(0);
  };

  const handleScrappedData = (value: ScrappedDataType, id: string, broadcast: boolean) => {
    setShowScrapped(true);
    setScrappedData(value);
    setTabIndex(0);
    if (broadcast) socket.emit("codeforces", { data: value, roomID: id });
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
    setShowScrapped(false);
    setTabIndex(0);
  };

  const onTabsChange = (value: number) => setTabIndex(value);

  return (
    <TabsContext.Provider
      value={{
        tabIndex,
        showScrapped,
        questionData,
        scrappedData,
        handleScrappedData,
        filterResponseData,
        onTabsChange,
        onQuestionDataChange,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export default TabsProvider;
