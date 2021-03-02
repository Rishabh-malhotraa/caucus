//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { socket } from "service/socket";
import { Avatar, Button, withStyles, Theme, Tooltip, Zoom } from "@material-ui/core";
import { UserInfoSS } from "types";
import Peer from "peerjs";
/**
 *
 * Invoke Call Peer when the component loads and if the guest user is empty then chill just return
 */

const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 1)",
    boxShadow: theme.shadows[2],
    fontSize: "14px",
    borderRadius: "25px",
  },
}))(Tooltip);

interface AppProps {
  params: string;
  myPeer: Peer;
  partnerUser?: UserInfoSS;
  user?: UserInfoSS;
  partnerVideo: MediaSrcType;
  partnerPID: string;
}

const RenderIcons = ({
  user,
  AudioRef,
  muted,
}: {
  user?: UserInfoSS;
  AudioRef: React.MutableRefObject<MediaSrcType>;
  muted: boolean;
}) => {
  if (!user) return <></>;
  return (
    <>
      <LightTooltip TransitionComponent={Zoom} title={user?.name} placement="bottom">
        <Avatar
          alt={user.name}
          src={user.image_link}
          style={{ width: "64px", height: "64px", margin: ".6rem 1rem" }}
        ></Avatar>
      </LightTooltip>
      <video
        playsInline
        muted={muted}
        ref={AudioRef}
        autoPlay
        style={{ height: "50px", width: "50px" }}
        autoplay
      />
      {/* {AudioRef.srcObject ? <video ref={AudioRef}></video> : <></>} */}
    </>
  );
};

const Room: React.FC<AppProps> = ({ params, partnerUser, user, myPeer, partnerVideo, partnerPID }) => {
  const userAudio = useRef({} as MediaSrcType);

  const [userStream, setUserStream] = useState<MediaStream>();
  const [partnerStream, setPartnerStream] = useState<MediaStream>();

  // const [partnerAudioMuted, setPartnerAudioMuted] = useState(false);

  // callUser -> somones-calling -> acceptCall -> callAccepted
  useEffect(() => {}, []);

  // const connectToNewUser = (userID: string, stream: MediaStream) => {
  //   const call = myPeer.call(userID, stream);
  //   console.log(call);
  //   call.on("stream", (userVideoStream: MediaStream) => {
  //     partnerAudio.current.srcObject = userVideoStream;
  //     setPartnerStream(userVideoStream);
  //   });

  //   call.on("close", () => {
  //     partnerAudio.current.remove();
  //   });
  // };

  return (
    <div style={{ display: "flex" }}>
      <video ref={userAudio} playsInline autoPlay muted style={{ height: "100px" }}></video>
      <video ref={partnerVideo} playsInline autoPlay src=""></video>
    </div>
  );
};

export default Room;

/* <RenderIcons user={user} AudioRef={userAudio} muted={audioMuted} />
  {partnerUser?.roomID ? (
    <RenderIcons user={partnerUser} AudioRef={partnerAudio} muted={partnerAudioMuted} />
  ) : (
    <></>
  )} */
