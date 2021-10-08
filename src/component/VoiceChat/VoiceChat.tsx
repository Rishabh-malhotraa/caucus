import React from "react";
import { Avatar, Button, withStyles, Theme, Tooltip, Zoom } from "@material-ui/core";
import { UserInfoSS } from "types";
import getRandomAvatar from "service/getRandomAvatar";
/**
 * Invoke Call Peer when the component loads and if the guest user is empty then chill just return
 */

interface AppProps {
  params: string;
  partnerUser?: UserInfoSS;
  user?: UserInfoSS;
}

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 1)",
    boxShadow: theme.shadows[2],
    fontSize: "14px",
    borderRadius: "25px",
  },
}))(Tooltip);

const RenderIcons = ({ user }: { user?: UserInfoSS }) => {
  if (!user) return <></>;
  return (
    <>
      <LightTooltip TransitionComponent={Zoom} title={user?.name || "John Doe"} placement="bottom">
        <Avatar
          alt={user.name}
          src={user.image_link || getRandomAvatar()}
          style={{ width: "64px", height: "64px", margin: ".6rem 1rem" }}
        >
          {user.name.charAt(0)}
        </Avatar>
      </LightTooltip>
    </>
  );
};

const Icons: React.FC<AppProps> = ({ params, partnerUser, user }) => {
  return (
    <div style={{ display: "flex" }}>
      <RenderIcons user={user} />
      {partnerUser?.roomID ? <RenderIcons user={partnerUser} /> : <></>}
    </div>
  );
};

export default Icons;
