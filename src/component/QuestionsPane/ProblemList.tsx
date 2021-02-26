import React, { useState } from "react";
import AutoCompleteLabel from "./Autocomplete";
import { LabelType } from "types";
import { tagsData, companiesData, difficultyData } from "./data";
import { Button, ButtonGroup } from "@material-ui/core";

const ProblemList = () => {
  const [companies, setCompanies] = useState<LabelType[]>([companiesData[0]]);
  const [tags, setTags] = useState<LabelType[]>([tagsData[5]]);
  const [difficulty, setDifficulty] = useState<LabelType[]>([]);
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
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
      </div>
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <ButtonGroup
          color="inherit"
          style={{
            fontSize: "13px",
          }}
        >
          <Button style={{ fontSize: "11px" }}>Random Problem</Button>
          <Button style={{ fontSize: "11px" }}>Filter Problems</Button>
        </ButtonGroup>
      </div>
    </>
  );
};

export default ProblemList;
