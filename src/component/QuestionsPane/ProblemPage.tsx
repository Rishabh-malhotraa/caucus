import React, { useContext } from "react";
import parse from "html-react-parser";
import styles from "./ProblemPage.module.css";
import Chip from "@material-ui/core/Chip";
import { Box, Divider, Grid } from "@material-ui/core";
import { TabsContext } from "service/TabsContext";
import { TabsContextTypes } from "types";
const ProblemPage = () => {
  const { questionData } = useContext(TabsContext) as TabsContextTypes;
  const { question_data, companies, tags } = questionData;

  return (
    <div>
      <Box className={styles.problem}>
        <h1>{question_data.question_title}</h1>
        {parse(question_data.question)}
        <Divider />
        <Grid container>
          <Grid item className={styles["container-item"]}>
            <div className={styles.chips}>
              {tags.map((tag, index) => (
                <Chip label={tag} key={index} color="primary" />
              ))}
            </div>
          </Grid>
          <Grid item className={styles["container-item"]}>
            <div className={styles.chips}>
              {companies.map((company, index) => (
                <Chip label={company} key={index} color="primary" />
              ))}
            </div>
          </Grid>
          <Grid item className={styles["container-item"]}>
            <a href={`${question_data.problem_url}/discuss`} target="_blank" rel=" ">
              <h4>Solution</h4>
            </a>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default ProblemPage;
