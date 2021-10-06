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
import { useParams } from "react-router-dom";



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
  const { id: roomID } = useParams<Record<string, string>>();

  useEffect(() => {
    axios
      .post(`${SERVER_URL}/api/fetch-problems`, prepareData())
      .then((res: AxiosResponse<QuestionListResponse[]>) => setResponse(res.data));
  }, []);

  (function () {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://cses.fi/lib/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML";   // use the location of your MathJax

    var config = 'MathJax.Hub.Config({' +
      'extensions: ["tex2jax.js"],' +
      'jax: ["input/TeX","output/HTML-CSS"]' +
      '});' +
      'MathJax.Hub.Startup.onload();';

    script.text = config;

    document.getElementsByTagName("head")[0].appendChild(script);
  })();

  const { filterResponseData, handleScrappedData } = useContext(TabsContext) as TabsContextTypes;
  const { id } = useParams<Record<string, string>>();

  const NextButton = () => {
    const getQuestionData = async () => {
      const { hostname } = new Url(url);
      if (hostname !== "codeforces.com" && hostname !== "atcoder.jp" && hostname !== "cses.fi") {
        setErrorText({
          error: true,
          comment: "Domain should either be codeforces/atcoder/CSES problem set",
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
    }).then((response) => filterResponseData(response.data, id));
  };
  return (
    <>
      <Grid container className={styles.root}>
        <Grid item className={styles["request-field"]}>
          <label>Enter Codeforces/ Atcoder/ CSES Problem Set Question URL:</label>
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
