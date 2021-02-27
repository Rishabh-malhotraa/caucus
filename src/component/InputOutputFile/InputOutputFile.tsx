import React, { useState, useEffect } from "react";
import { Paper, Tab, Tabs, Button, Box, TextField } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { withStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import { socket } from "service/socket";
import { useParams } from "react-router-dom";

interface AppProps {
  TextAreaRef: React.RefObject<HTMLDivElement>;
  rows: number;
}

const CssTextField = withStyles({
  root: {
    // #115293
    padding: "1rem",
    height: "100%",
    width: "100%",
    "& .MuiInputBase-root": {
      outline: "none",
      color: "whitesmoke",
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
        borderColor: "#0055bb",
      },
    },
  },
})(TextField);

const InputOutputFile: React.FC<AppProps> = ({ TextAreaRef, rows }) => {
  const { id } = useParams<Record<string, string>>();
  const [value, setValue] = useState(0);
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const displayNotification = () => {
    enqueueSnackbar("Connection is established", {
      variant: "success",
    });
  };

  useEffect(() => {
    socket.on("input-data", (inputData: string) => {
      console.log("hey" + inputData);
      setInputText(inputData);
    });
  });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const inputTextFn = (value: string) => {
    setInputText(value);
    socket.emit("emit-input-data", { data: value, roomID: id });
  };

  const renderTextArea = (value: number) => {
    // console.log('text-area  ' + rows);
    if (value === 0) {
      return (
        <CssTextField
          size="medium"
          variant="outlined"
          value={inputText}
          onChange={(event) => inputTextFn(event.target.value)}
          multiline
          rows={rows}
        />
      );
    } else if (value === 1) {
      return (
        <CssTextField
          size="medium"
          variant="outlined"
          value={outputText}
          rows={rows}
          onChange={(event) => setOutputText(event.target.value as string)}
          multiline
          InputProps={{
            readOnly: true,
          }}
        />
      );
    } else setValue(0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
      ref={TextAreaRef}
    >
      <Paper
        style={{
          position: "relative",
          backgroundColor: "#252526",
          color: "white",
          borderRadius: "0px 8px 0px 0px",
        }}
      >
        <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="inherit" centered>
          <Tab label="Input"></Tab>
          <Tab label="Output"></Tab>
        </Tabs>
        <Box
          style={{
            height: "48px",
            borderRadius: "0px 8px 0px 0px",
            position: "absolute",
            backgroundColor: "#00621E",
            top: "0px",
            right: "0px",
            fontWeight: "bold",

            color: "whitesmoke",
          }}
        >
          <Button
            variant="text"
            color="inherit"
            endIcon={<SendRoundedIcon />}
            style={{ height: "48px" }}
            onClick={() => {
              displayNotification();
            }}
          >
            Run Code
          </Button>
        </Box>
      </Paper>
      {
        //@ts-ignore
        <div
          style={{
            display: "flex",
            flexGrow: 1,
            backgroundColor: "	#1e1e1e",
            color: "white",
          }}
        >
          {renderTextArea(value)}
        </div>
      }
    </div>
  );
};

export default InputOutputFile;
