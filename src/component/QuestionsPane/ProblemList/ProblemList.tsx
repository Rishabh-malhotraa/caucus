import React, { useState, useEffect, useContext } from "react";
import AutoCompleteLabel from "./Autocomplete";
import { Button, ButtonGroup, Divider, IconButton, TextField, withStyles } from "@material-ui/core";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import axios, { AxiosResponse } from "axios";
import { SERVER_URL } from "config.keys";
import { allCompanies, allDifficulties, allTags } from "./data";
import ListPagination from "./ListPagination";
import Grid from "@material-ui/core/Grid";
import styles from "./ProblemList.module.css";
import { LabelType, QuestionListResponse, ScrappedDataType, TabsContextTypes } from "types";
import { tagsData, companiesData, difficultyData } from "./data";
import { TabsContext } from "service/TabsContext";
import Url from "url-parse";
import { useRoomID } from "service/RoomIdContext";

interface AppProps {
  companies: LabelType[];
  tags: LabelType[];
  difficulty: LabelType[];
  url: string;
  setCompanies: React.Dispatch<React.SetStateAction<LabelType[]>>;
  setTags: React.Dispatch<React.SetStateAction<LabelType[]>>;
  setDifficulty: React.Dispatch<React.SetStateAction<LabelType[]>>;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

const CssTextField = withStyles({
  root: {
    height: "100%",
    width: "100%",
    "& .MuiInputBase-root": {
      fontSize: "12px",
      padding: "0px",
      outline: "none",
      color: "#edf2fb",
    },
    "& label.Mui-focused": {
      color: "#0055bb",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#0055bb",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#0055bb",
      },
      "&:hover fieldset": {
        borderColor: "#0055bb",
      },
      "&.Mui-focused fieldset": {
        border: "2px solid #0055bb ",
      },
    },
  },
})(TextField);

const CssButton = withStyles({
  root: {
    "&:hover": {
      background: "rgba(200, 200, 200, 0.1)",
    },
  },
})(Button);

const ProblemList: React.FC<AppProps> = ({
  companies,
  difficulty,
  tags,
  url,
  setCompanies,
  setDifficulty,
  setTags,
  setUrl,
}) => {
  const [response, setResponse] = useState<QuestionListResponse[]>([]);
  const [errorText, setErrorText] = useState({ error: false, comment: "" });
  const { roomID } = useRoomID();

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/api/fetch-problems`, prepareData())
      .then((res: AxiosResponse<QuestionListResponse[]>) => setResponse(res.data));
  }, []);

  const { filterResponseData, handleScrappedData } = useContext(TabsContext) as TabsContextTypes;

  const NextButton = () => {
    const getQuestionData = async () => {
      const { hostname } = new Url(url);
      if (hostname !== "codeforces.com" && hostname !== "atcoder.jp") {
        setErrorText({
          error: true,
          comment: "Domain should either be codeforces or atcoder",
        });
      } else {
        const { data }: AxiosResponse<{ error: boolean; htmlString: string }> = await axios({
          method: "POST",
          url: `${SERVER_URL}/api/fetch-contest-problem`,
          responseType: "json",
          data: {
            url: url,
            hostname: hostname,
          },
        });
        const { error, htmlString } = data;

        if (error) {
          setErrorText({
            error: true,
            comment: "Unable To fetch question",
          });
        } else {
          handleScrappedData(
            {
              htmlString,
              hostname,
            },
            roomID,
            true
          );
        }
      }
    };

    return (
      <Button
        className={styles["adornment-button"]}
        style={{ color: "#0055bb" }}
        onClick={async () => {
          await getQuestionData();
        }}
      >
        <ArrowForwardRoundedIcon />
      </Button>
    );
  };

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
    }).then((response) => filterResponseData(response.data, roomID));
  };
  return (
    <>
      <Grid container className={styles.root}>
        <Grid item className={styles["request-field"]}>
          <label>Enter Codeforces Or Atcoder Question URL:</label>
          <CssTextField
            onChange={(e) => {
              setUrl(e.target.value as string);
            }}
            value={url}
            error={errorText.error}
            helperText={errorText.comment}
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: <NextButton />,
            }}
          />
        </Grid>

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
            <CssButton onClick={getRandomQuestion}>Random Problem</CssButton>
            <CssButton
              onClick={async () => {
                await fetchProblems();
              }}
            >
              Filter Problems
            </CssButton>
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
