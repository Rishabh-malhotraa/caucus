import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, Theme } from '@material-ui/core/styles';

export const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 1)',
    boxShadow: theme.shadows[2],
    fontSize: '14px',
    padding: '2rem',
    borderRadius: '3rem',
  },
}))(Tooltip);

export const text =
  'Logging in as a guest would redirect you to a public room while Logging in from a provider would redirect you to a private room which would only have you and people you share the link';

//   <Tooltip
//   TransitionComponent={Zoom}
//   title={text}
//   placement="top"
//   arrow
// >
