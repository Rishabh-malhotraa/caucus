import React, { useState, useEffect, useContext } from "react";
import AutoCompleteLabel from "./Autocomplete";
import { Button, ButtonGroup, Divider } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import { SERVER_URL } from "config";
import { allCompanies, allDifficulties, allTags } from "./data";
import ListPagination from "./ListPagination";
import Grid from "@material-ui/core/Grid";
import styles from "./ProblemList.module.css";
import { LabelType, QuestionListResponse, TabsContextTypes } from "types";
import { tagsData, companiesData, difficultyData } from "./data";
import { TabsContext } from "service/TabsContext";
import { useParams } from "react-router-dom";

interface AppProps {
  companies: LabelType[];
  tags: LabelType[];
  difficulty: LabelType[];
  setCompanies: React.Dispatch<React.SetStateAction<LabelType[]>>;
  setTags: React.Dispatch<React.SetStateAction<LabelType[]>>;
  setDifficulty: React.Dispatch<React.SetStateAction<LabelType[]>>;
}

const ProblemList: React.FC<AppProps> = ({
  companies,
  difficulty,
  tags,
  setCompanies,
  setDifficulty,
  setTags,
}) => {
  const [response, setResponse] = useState<QuestionListResponse[]>([]);

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/api/fetch-problems`, prepareData())
      .then((res: AxiosResponse<QuestionListResponse[]>) => setResponse(res.data));
  }, []);

  const { filterResponseData } = useContext(TabsContext) as TabsContextTypes;
  const { id } = useParams<Record<string, string>>();

  const prepareData = () => {
    const c = companies.map((el) => el.name);
    const d = difficulty.map((el) => el.name);
    const t = tags.map((el) => el.name);
    return {
      companies: c.length ? c : allCompanies,
      difficulty: d.length ? d : allDifficulties,
      tags: t.length ? t : allTags,
    };
  };

  const fetchProblems = async () => {
    const response: AxiosResponse<QuestionListResponse[]> = await axios({
      method: "post",
      url: `${SERVER_URL}/api/fetch-problems`,
      data: prepareData(),
      responseType: "json",
    });
    setResponse(response.data);
  };
  const getRandomQuestion = () => {
    const randomID = Math.floor(Math.random() * 169);
    axios({
      method: "post",
      url: `${SERVER_URL}/api/get-problem`,
      data: { question_id: randomID },
      responseType: "json",
    }).then((response) => filterResponseData(response.data, id));
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
            <Button onClick={getRandomQuestion}>Random Problem</Button>
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
