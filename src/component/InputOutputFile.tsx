import React, { useState } from 'react';
import { Paper, Tab, Tabs, Button, Box, TextField } from '@material-ui/core';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

interface AppProps {
  TextAreaRef: React.RefObject<HTMLDivElement>;
  rows: number;
}

const InputOutputFile: React.FC<AppProps> = ({ TextAreaRef, rows }) => {
  const [value, setValue] = useState(0);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const renderTextArea = (value: number) => {
    console.log('text-area  ' + rows);
    if (value === 0) {
      return (
        <TextField
          size="medium"
          color="primary"
          variant="outlined"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          multiline
          rows={rows}
          style={{
            color: 'white',
            padding: '1rem',
            height: '100%',
            width: '100%',
          }}
        />
      );
    } else if (value === 1) {
      return (
        <TextField
          size="medium"
          variant="outlined"
          value={outputText}
          rows={rows}
          onChange={(event) => setOutputText(event.target.value)}
          multiline
          style={{
            padding: '1rem',
            height: '100%',
            width: '100%',
            outline: 'white',
          }}
        />
      );
    } else setValue(0);
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      ref={TextAreaRef}
    >
      <Paper
        style={{
          position: 'relative',
          backgroundColor: '#272822',
          color: 'white',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          centered
        >
          <Tab label="Input"></Tab>
          <Tab label="Output"></Tab>
        </Tabs>
        <Box
          style={{
            height: '48px',
            position: 'absolute',
            backgroundColor: '#00621E',
            top: '0px',
            right: '0px',
            fontWeight: 'bold',
            color: 'whitesmoke',
          }}
        >
          <Button
            variant="text"
            color="inherit"
            endIcon={<SendRoundedIcon />}
            style={{ height: '48px' }}
          >
            Run Code
          </Button>
        </Box>
      </Paper>
      {
        //@ts-ignore
        <div
          style={{
            display: 'flex',
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
          }}
        >
          {renderTextArea(value)}
        </div>
      }
    </div>
  );
};

export default InputOutputFile;
