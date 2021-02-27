import React, { createRef, useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";
import styles from "./ProblemList.module.css";
import { StylesProvider } from "@material-ui/core/styles";
import { QuestionListResponse } from "types";
import { List, ListItem } from "@material-ui/core";

const getColor = (diff: string) => {
  if (diff === "easy") return "#1faa00";
  else if (diff === "medium") return "#fbc02d";
  else return "#dd2c00";
};

const PaginationComponent = ({ rows }: { rows: QuestionListResponse[] }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = React.useState(1);
  const navRef = createRef<HTMLElement>();

  useEffect(() => {
    //@ts-ignore
    const height = Math.floor(navRef.current?.clientHeight / 38);
    setRowsPerPage(height);
  }, []);

  console.log(rows);
  // const rows = [1, 2, 3, 4, 5];
  const count = Math.floor(
    rows.length % rowsPerPage === 0 ? rows.length / rowsPerPage : rows.length / rowsPerPage + 1
  );
  return (
    <StylesProvider injectFirst>
      <>
        <Grid item className={styles["pagination-container"]}>
          <List component="nav" aria-label="contacts" className={styles["list-container"]} ref={navRef}>
            {(rowsPerPage > 0
              ? rows.slice((page - 1) * rowsPerPage, (page - 1) * rowsPerPage + rowsPerPage)
              : rows
            ).map((el: QuestionListResponse) => {
              return (
                <>
                  <ListItem button className={styles["list-item"]}>
                    <div style={{ flexGrow: 1 }}>{`${el.question_id}. ${el.question_title}`}</div>
                    <div style={{ color: getColor(el.difficulty), paddingLeft: "8px", fontWeight: "bold" }}>
                      {el.difficulty}
                    </div>
                  </ListItem>
                </>
              );
            })}
          </List>
        </Grid>
        <Grid item className={styles["pagination-group"]}>
          <Pagination
            count={count}
            page={page}
            onChange={(event, val) => setPage(val)}
            color="primary"
            className={styles["pagination-element"]}
          />
        </Grid>
      </>
    </StylesProvider>
  );
};

export default PaginationComponent;
