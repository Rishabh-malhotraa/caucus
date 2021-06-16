//@ts-nocheck
/* eslint-disable no-use-before-define */
// please dont expect me to re-write css for this mess X-X
import React from "react";
import { useTheme, fade, makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
import DoneIcon from "@material-ui/icons/Done";
import Autocomplete, { AutocompleteCloseReason } from "@material-ui/lab/Autocomplete";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputBase from "@material-ui/core/InputBase";
import { LabelType } from "types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "1rem",
      flexGrow: 1,
      fontSize: 13,
    },
    button: {
      fontSize: 13,
      width: "100%",
      textAlign: "left",
      paddingBottom: 8,
      color: "#586069",
      fontWeight: 600,
      "&:hover,&:focus": {
        color: "#0366d6",
      },
      "& span": {
        width: "100%",
      },
      "& svg": {
        width: 16,
        height: 16,
      },
    },
    tag: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 3,
      height: 20,
      padding: ".15em 4px",
      fontWeight: 600,
      lineHeight: "15px",
      borderRadius: 2,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    popper: {
      border: "1px solid rgba(27,31,35,.15)",
      boxShadow: "0 3px 12px rgba(27,31,35,.15)",
      borderRadius: 3,
      width: 300,
      zIndex: 5,
      fontSize: 13,
      color: "#d8d5d0",
      backgroundColor: "#272a2b",
    },
    header: {
      borderBottom: "1px solid #585a5c",
      padding: "8px 10px",
      fontWeight: 600,
    },
    inputBase: {
      padding: 10,
      width: "100%",
      color: "white",
      borderBottom: "1px solid #d8d5d0",
      "& input": {
        borderRadius: 4,
        backgroundColor: "#1e1f1f",
        padding: 8,
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        border: "1px solid #585a5c",
        fontSize: 14,
        "&:focus": {
          boxShadow: `${fade("#0055bb", 0.25)} 0 0 0 0.2rem`,
          borderColor: "#0055bb",
        },
      },
    },
    paper: {
      boxShadow: "none",
      margin: 0,
      color: "#d8d5d0",
      background: "#191c1d",
      fontSize: 13,
      "& .MuiAutocomplete-noOptions": {
        color: "#edeceb !important",
      },
    },
    option: {
      minHeight: "auto",
      alignItems: "flex-start",
      padding: 8,
      '&[aria-selected="true"]': {
        backgroundColor: "#424242",
      },
      '&[data-focus="true"]': {
        backgroundColor: "#37474f",
      },
    },
    popperDisablePortal: {
      position: "relative",
    },
    iconSelected: {
      width: 17,
      height: 17,
      marginRight: 5,
      marginLeft: -2,
    },
    color: {
      width: 14,
      height: 14,
      flexShrink: 0,
      borderRadius: 3,
      marginRight: 8,
      marginTop: 2,
    },
    text: {
      flexGrow: 1,
    },
    close: {
      opacity: 0.6,
      width: 18,
      height: 18,
    },
  })
);

export default function AutoCompleteLabel({ value, setValue, labels, type }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // default values we are adding 2 okays
  const [pendingValue, setPendingValue] = React.useState<LabelType[]>([]);
  const theme = useTheme();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPendingValue(value);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.ChangeEvent<{}>, reason: AutocompleteCloseReason) => {
    if (reason === "toggleInput") {
      return;
    }
    setValue(pendingValue);
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "autocomplete-label" : undefined;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <ButtonBase disableRipple className={classes.button} aria-describedby={id} onClick={handleClick}>
          <span>{type}</span>
          <SettingsIcon />
        </ButtonBase>
        {value.map((label) => (
          <div
            key={label.name}
            className={classes.tag}
            style={{
              backgroundColor: label.color,
              color: theme.palette.getContrastText(label.color),
            }}
          >
            {label.name}
          </div>
        ))}
      </div>
      <Popper id={id} open={open} anchorEl={anchorEl} placement="bottom-start" className={classes.popper}>
        <div className={classes.header}>Selects everything if no options is selected</div>
        <Autocomplete
          open
          onClose={handleClose}
          multiple
          classes={{
            paper: classes.paper,
            option: classes.option,
            popperDisablePortal: classes.popperDisablePortal,
          }}
          value={pendingValue}
          onChange={(event, newValue) => {
            setPendingValue(newValue);
          }}
          disableCloseOnSelect
          disablePortal
          renderTags={() => null}
          noOptionsText="No Match Found"
          renderOption={(option, { selected }) => (
            <React.Fragment>
              <DoneIcon
                className={classes.iconSelected}
                style={{ visibility: selected ? "visible" : "hidden" }}
              />
              <span className={classes.color} style={{ backgroundColor: option.color }} />
              <div className={classes.text}>
                {option.name}
                <br />
                {option.description}
              </div>
              <CloseIcon className={classes.close} style={{ visibility: selected ? "visible" : "hidden" }} />
            </React.Fragment>
          )}
          options={[...labels].sort((a, b) => {
            // Display the selected labels first.
            let ai = value.indexOf(a);
            ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
            let bi = value.indexOf(b);
            bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
            return ai - bi;
          })}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <InputBase
              ref={params.InputProps.ref}
              inputProps={params.inputProps}
              autoFocus
              className={classes.inputBase}
            />
          )}
        />
      </Popper>
    </React.Fragment>
  );
}
