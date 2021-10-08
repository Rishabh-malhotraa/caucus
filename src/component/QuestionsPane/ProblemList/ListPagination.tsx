import React, { createRef, useEffect, useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import styles from "./ProblemList.module.css";
import { withStyles } from "@material-ui/core/styles";
import { QuestionListResponse, TabsContextTypes } from "types";
import { List, ListItem } from "@material-ui/core";
import axios from "axios";
import { SERVER_URL } from "config.keys";
import { TabsContext } from "service/TabsContext";
import { useRoomID } from "service/RoomIdContext";

const getColor = (diff: string) => {
  if (diff === "easy") return "#1faa00";
  else if (diff === "medium") return "#fbc02d";
  else return "#dd2c00";
};

const CssPagination = withStyles({
  root: {
    // backgroundColor: "#3e3e42",

    color: "white",
    "& svg": {
      fill: "white",
    },
    "& button": {
      color: "white",
    },
  },
})(Pagination);

const CssListItem = withStyles({
  root: {
    // backgroundColor: "#3e3e42",
    transition: "background 3s ease in",
    padding: "0.5rem !important",
    "align-items": "flex-start !important",
    "&:hover": {
      background: "rgba(200, 200, 200, 0.1)",
      "border-radius": "10px",
    },
  },
})(ListItem);

const PaginationComponent = ({ rows }: { rows: QuestionListResponse[] }) => {
  const { filterResponseData } = useContext(TabsContext) as TabsContextTypes;

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = React.useState(1);
  const navRef = createRef<HTMLElement>();
  const { roomID: id } = useRoomID();

  useEffect(() => {
    //@ts-ignore
    const height = Math.floor(navRef.current?.clientHeight / 38);
    setRowsPerPage(height);
  }, []);

  const getQuestion = (question_id: number) => {
    axios({
      method: "post",
      url: `${SERVER_URL}/api/get-problem`,
      data: { question_id: question_id },
      responseType: "json",
    }).then((response) => {
      filterResponseData(response.data, id);
    });
  };

  const count = Math.floor(
    rows.length % rowsPerPage === 0 ? rows.length / rowsPerPage : rows.length / rowsPerPage + 1
  );
  return (
    <>
      <Grid item className={styles["pagination-container"]}>
        <List component="nav" aria-label="contacts" className={styles["list-container"]} ref={navRef}>
          {(rowsPerPage > 0
            ? rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
            : rows
          ).map((el: QuestionListResponse, index) => {
            return (
              <CssListItem
                key={index}
                button
                className={styles["list-item"]}
                onClick={() => getQuestion(el.question_id)}
              >
                <div style={{ flexGrow: 1 }}>{`${el.question_id}. ${el.question_title}`}</div>
                <div style={{ color: getColor(el.difficulty), paddingLeft: "8px", fontWeight: "bold" }}>
                  {el.difficulty}
                </div>
              </CssListItem>
            );
          })}
        </List>
      </Grid>
      <Grid item className={styles["pagination-group"]}>
        <CssPagination
          shape="rounded"
          count={count}
          page={page}
          onChange={(event, val) => setPage(val)}
          color="primary"
          className={styles["pagination-element"]}
        />
      </Grid>
    </>
  );
};

export default PaginationComponent;
