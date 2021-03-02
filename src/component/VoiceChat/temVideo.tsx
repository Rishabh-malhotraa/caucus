//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { socket } from "service/socket";
import { Avatar, Button, withStyles, Theme, Tooltip, Zoom } from "@material-ui/core";
import { UserInfoSS } from "types";
import Peer from "peerjs";

/**
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

interface MediaSrcType {
  srcObject: MediaStream;
}

interface AppProps {
  params: string;
  partnerUser?: UserInfoSS;
  user?: UserInfoSS;
}

const RenderIcons = ({
  user,
  AudioRef,
  muted,
}: {
  user: UserInfoSS;
  AudioRef: MediaSrcType;
  muted: boolean;
}) => {
  if (!user) return <></>;
  return (
    <>
      <LightTooltip TransitionComponent={Zoom} title={user?.name || "John Doe"} placement="bottom">
        <Avatar
          alt={user.name}
          src={user.image_link}
          style={{ width: "64px", height: "64px", margin: ".6rem 1rem" }}
        ></Avatar>
      </LightTooltip>
      <video playsInline muted ref={AudioRef} autoPlay style={{ height: "0px", width: "0px" }} />
      {/* {AudioRef.srcObject ? <video ref={AudioRef}></video> : <></>} */}
    </>
  );
};

const Room: React.FC<AppProps> = ({ params, partnerUser, user }) => {
  const userAudio = useRef({} as MediaSrcType);
  const partnerAudio = useRef({} as MediaSrcType);

  const [stream, setStream] = useState<MediaStream>();
  const [partnerStream, setPartnerStream] = useState<MediaStream>();
  const [audioMuted, setAudioMuted] = useState(false);
  const [partnerAudioMuted, setPartnerAudioMuted] = useState(false);

  function callPeer() {
    console.log(stream);
    const peer = new Peer({
      initiator: true,
      trickle: false,
      config: {
        iceServers: [
          {
            urls: "stun:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
          {
            urls: "turn:numb.viagenie.ca",
            username: "sultan1640@gmail.com",
            credential: "98376683",
          },
        ],
      },
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", { roomID: partnerUser?.roomID, signalData: data });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    // final thing reciecing the thing back from the user
    socket.on("callAccepted", (signal) => {
      peer.signal(signal);
    });
  }

  function acceptCall() {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.emit("acceptCall", { signal: data, roomID: user?.roomID });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  // callUser -> somones-calling -> acceptCall -> callAccepted
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
      setStream(stream);
      if (userAudio.current) {
        userAudio.current.srcObject = stream;
      }
    });

    if (partnerUser) callPeer();

    socket.on("someones-calling", (data) => {
      setPartnerStream(data.signal);
      acceptCall();
    });

    socket.on("partner-muted", (data) => {
      setPartnerAudioMuted(data.muted);
    });
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <RenderIcons user={user} AudioRef={userAudio} muted={audioMuted} />
      {partnerUser?.roomID ? (
        <RenderIcons user={partnerUser} AudioRef={partnerAudio} muted={partnerAudioMuted} />
      ) : (
        <></>
      )}
    </div>
  );
};

export const RoomII = ({ params }: { params: string }) => {
  console.log(params);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={`https://stylizedbay.com/wp-content/uploads/2018/02/unknown-avatar.jpg`}
          style={{ width: "64px", height: "64px", margin: ".6rem 1rem" }}
        ></Avatar>
      </div>
    </>
  );
};

export default Room;

// export default RoomII;

// const Video = ({ peer, muted }: { peer: Instance; muted: boolean }) => {
//   const ref = useRef({} as MediaSrcType);

//   useEffect(() => {
//     peer.on("stream", (stream: MediaStream) => {
//       ref.current.srcObject = stream;
//     });
//   }, []);
//   console.log(ref);
//   return (
//     <video
//       muted={muted}
//       playsInline
//       autoPlay
//       //@ts-ignore
//       ref={ref}
//       style={{ width: "150px", height: "150px" }}
//     />
//   );
// };
