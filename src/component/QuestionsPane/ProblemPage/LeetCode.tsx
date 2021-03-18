import React from "react";
import parse from "html-react-parser";
import "./ProblemPage.css";
import Chip from "@material-ui/core/Chip";
import { Box, Divider, Grid } from "@material-ui/core";
import { QuestionDataSS } from "types";

const LeetCode = ({ questionData }: { questionData: QuestionDataSS }) => {
  const { question_data, companies, tags } = questionData;

  return (
    <div>
      <Box className="leetcode">
        <h1>{question_data.question_title}</h1>
        {parse(question_data.question)}
        <Divider />
        <Grid container>
          <Grid item className="container-item">
            <div className={"chips"}>
              {tags.map((tag, index) => (
                <Chip label={tag} key={index} color="primary" />
              ))}
            </div>
          </Grid>
          <Grid item className={"container-item"}>
            <div className="chips">
              {companies.map((company, index) => (
                <Chip label={company} key={index} color="primary" />
              ))}
            </div>
          </Grid>
          <Grid item className={"container-item"}>
            <a href={`${question_data.problem_url}/discuss`} target="_blank" rel=" ">
              <h4>Solution</h4>
            </a>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default LeetCode;
