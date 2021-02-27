import React, { useState, useEffect } from "react";
import AutoCompleteLabel from "./Autocomplete";
import { LabelType } from "types";
import { tagsData, companiesData, difficultyData } from "./data";
import { Button, ButtonGroup, Divider } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import { SERVER_URL } from "config";
import { allCompanies, allDifficulties, allTags } from "./data";
import ListPagination from "./ListPagination";
import Grid from "@material-ui/core/Grid";
import styles from "./ProblemList.module.css";
import { QuestionListResponse } from "types";

const ProblemList = () => {
  const [companies, setCompanies] = useState<LabelType[]>([companiesData[0]]);
  const [tags, setTags] = useState<LabelType[]>([tagsData[5]]);
  const [difficulty, setDifficulty] = useState<LabelType[]>([difficultyData[1]]);
  const [response, setResponse] = useState<QuestionListResponse[]>([]);

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/api/fetch-problems`, prepareData())
      .then((res: AxiosResponse<QuestionListResponse[]>) => setResponse(res.data));
  }, []);

  const prepareData = () => {
    const c = companies.map((el) => el.name);
    const d = difficulty.map((el) => el.name);
    const t = tags.map((el) => el.name);
    console.log(c, d, t);
    return {
      companies: c.length ? c : allCompanies,
      difficulty: d.length ? d : allDifficulties,
      tags: t.length ? t : allTags,
    };
  };

  console.log(prepareData());
  const fetchProblems = async () => {
    const response: AxiosResponse<QuestionListResponse[]> = await axios({
      method: "post",
      url: `${SERVER_URL}/api/fetch-problems`,
      data: prepareData(),
      responseType: "json",
    });
    setResponse(response.data);
  };

  return (
    <>
      <Grid container className={styles.root}>
        <Grid item className={styles.autocomplete}>
          <AutoCompleteLabel
            value={companies}
            setValue={setCompanies}
            labels={companiesData}
            type="Companies"
          />
          <AutoCompleteLabel value={tags} setValue={setTags} labels={tagsData} type="Tags" />
          <AutoCompleteLabel
            value={difficulty}
            setValue={setDifficulty}
            labels={difficultyData}
            type="Difficulty"
          />
        </Grid>
        <Grid item className={styles["btn-group"]}>
          <ButtonGroup color="inherit">
            <Button>Random Problem</Button>
            <Button
              onClick={async () => {
                await fetchProblems();
              }}
            >
              Filter Problems
            </Button>
          </ButtonGroup>
        </Grid>
        <Divider className={styles.divider} />
        <Grid item container direction="column" className={styles.pagination}>
          <ListPagination rows={response} />
        </Grid>
      </Grid>
    </>
  );
};

export default ProblemList;
