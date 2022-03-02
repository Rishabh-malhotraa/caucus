//@ts-nocheck
import React, { useRef, useState, createRef } from "react";
import parse from "html-react-parser";
import "./ProblemPage.css";
import Chip from "@material-ui/core/Chip";
import { Divider, Grid } from "@material-ui/core";
import { ScrappedDataType } from "types";
import renderMathInElement from "katex/dist/contrib/auto-render";
import "katex/dist/katex.min.css";

const LeetCode = ({ scrappedData }: { scrappedData: ScrappedDataType }) => {
  const { hostname, htmlString } = scrappedData;
  const MathRef = createRef<HTMLElement>();

  React.useEffect(() => {
    if (MathRef) {
      renderMathInElement(MathRef.current!, {
        delimiters: [
          { left: "$$$", right: "$$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "%%", right: "%%", display: true },
          { left: "\\(", right: "\\)", display: false },
        ],
      });
    }
  }, [MathRef]);

  return (
    <div>
      {hostname === "codeforces.com" ? (
        <div className={"codeforces"} ref={MathRef}>
          {parse(htmlString)}
        </div>
      ) : (
        <div className={"atcoder"} ref={MathRef}>
          {parse(htmlString)}
        </div>
      )}
      <Divider />
    </div>
  );
};
export default LeetCode;
<div></div>;
