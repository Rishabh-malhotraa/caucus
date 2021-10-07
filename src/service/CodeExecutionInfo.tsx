import React from "react";
import { CodeExecutionInfoType } from "types";

export const CodeExecutionInfoContext = React.createContext<CodeExecutionInfoType | null>(null);

const CodeExecutionInfoProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const [outputData, setOutputData] = React.useState({
    output: "",
    memory: 1,
    cpuTime: 1,
  });

  return (
    <CodeExecutionInfoContext.Provider
      value={{ value, loading, inputText, outputData, setValue, setLoading, setInputText, setOutputData }}
    >
      {children}
    </CodeExecutionInfoContext.Provider>
  );
};
export default CodeExecutionInfoProvider;
