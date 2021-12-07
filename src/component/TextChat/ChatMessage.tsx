import cx from "clsx";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./ChatMessage-styles";

interface AppProps {
  classes?: any;
  avatar: string;
  messages: string[];
  side: "left" | "right";
}

const ChatMsg = withStyles(styles, { name: "ChatMsg" })((props: AppProps) => {
  const { classes, avatar, messages, side } = props;

  const attachClass = (index: number) => {
    if (index === 0) {
      return classes[`${side}First`];
    }
    if (index === messages.length - 1) {
      return classes[`${side}Last`];
    }
    return "";
  };
  return (
    <Grid container spacing={2} justify={side === "right" ? "flex-end" : "flex-start"}>
      {side === "left" && (
        <Grid item>
          <Avatar src={avatar} className={cx(classes.avatar)} />
        </Grid>
      )}
      <Grid item xs={8}>
        {messages.map((msg, i) => {
          return (
            <div key={i} className={classes[`${side}Row`]}>
              <Typography align={"left"} className={cx(classes.msg, classes[side], attachClass(i))}>
                {msg}
              </Typography>
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
});

export default ChatMsg;
