import React, { useContext } from "react";
import parse from "html-react-parser";
import Chip from "@material-ui/core/Chip";
import { Box, Divider, Grid } from "@material-ui/core";
import { TabsContext } from "service/TabsContext";
import { TabsContextTypes } from "types";
import LeetCode from "./LeetCode";
import CodeForces from "./CodeForces";

const ProblemPage = () => {
  const { questionData, showScrapped, scrappedData } = useContext(TabsContext) as TabsContextTypes;

  return (
    <div style={{ margin: "1rem" }}>
      {showScrapped ? <CodeForces scrappedData={scrappedData} /> : <LeetCode questionData={questionData} />}
    </div>
  );
};

export default ProblemPage;
