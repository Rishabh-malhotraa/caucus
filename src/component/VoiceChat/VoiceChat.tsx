//@ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import Peer, { Instance, SignalData } from "simple-peer";
import { socket } from "service/socket";
import { Avatar, Button } from "@material-ui/core";

interface MediaSrcType {
  srcObject: MediaStream;
}
interface PeerRefType {
  peerID: string;
  peer: Instance;
}

interface UserJoinedPayload {
  signal: SignalData;
  callerID: string;
  stream: MediaStream;
}

interface ReturnSignalPayload {
  signal: SignalData;
  id: string;
}

const Video = ({ peer, muted }: { peer: Instance; muted: boolean }) => {
  const ref = useRef({} as MediaSrcType);

  useEffect(() => {
    peer.on("stream", (stream: MediaStream) => {
      ref.current.srcObject = stream;
    });
  }, []);
  console.log(ref);
  return (
    <video
      muted={muted}
      playsInline
      autoPlay
      //@ts-ignore
      ref={ref}
      style={{ width: "150px", height: "150px" }}
    />
  );
};

export const Room = ({ params }: { params: string }) => {
  const [peers, setPeers] = useState<Instance[]>([]);
  const userVideo = useRef({} as MediaSrcType);
  const [stream, setStream] = useState<MediaStream>();
  const peersRef = useRef([] as PeerRefType[]);
  const [audioMuted, setAudioMuted] = useState(false);
  const roomID = params;

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true }).then((stream) => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    // okay we are joining a room with the given room id huh
    socket.emit("join-room", roomID);
    // fetching all the users from the socker io server
    socket.on("all-users", (users: string[]) => {
      console.log(users);
      const peers: Instance[] = [];
      // looping thorugh all the users we got we want to create a new peer for them -- because peer meshes
      users.forEach((userID) => {
        const peer = createPeer(userID, socket.id, stream);
        peersRef.current.push({
          peerID: userID,
          peer,
        });
        peers.push(peer);
      });
      setPeers(peers);
    });

    socket.on("user-joined", (payload: UserJoinedPayload) => {
      /**
       * @signal - this is the incomming signalz
       * @calledID - is the id of the user which is calling us
       * @stream - this is basically our own stream of data
       *  */
      const peer = addPeer(payload.signal, payload.callerID, stream);
      peersRef.current.push({
        peerID: payload.callerID,
        peer,
      });

      setPeers((users) => [...users, peer]);
    });

    socket.on("receiving-returned-signal", (payload: ReturnSignalPayload) => {
      const item = peersRef.current.find((p) => p.peerID === payload.id);
      if (item) item.peer.signal(payload.signal);
    });
  }, []);

  /**
   * @userToSignal - socekt_id of the person who is already in the room (person being called)
   * @calledID - SID of person who just joined, caller
   * @stream - stream<audio,video> data of the person who is calling(caller)
   *  */
  function createPeer(userToSignal: string, callerID: string, stream: MediaStream) {
    const peer = new Peer({
      // true if this is the peer initiating the connection -- immediately on construction the peer emits the signal
      initiator: true,
      trickle: false,
      stream,
      // stream is out audio/video object
    });

    // immediately on construction of the peer it emits an event called signal we need to listen to that event and send data to the serfver
    peer.on("signal", (signal) => {
      socket.emit("sending-signal", {
        userToSignal, // user ID of the people who are already in the room
        callerID, // our own socket id
        signal, // sending the signal data
      });
    });

    return peer;
  }

  function addPeer(incomingSignal: SignalData, callerID: string, stream: MediaStream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socket.emit("returning-signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  function toggleMuteAudio() {
    // if (stream) {
    setAudioMuted(!audioMuted);
    // stream.getAudioTracks()[0].enabled = audioMuted;
  }

  return (
    <div>
      {/* <Avatar
        alt="Remy Sharp"
        src={`https://stylizedbay.com/wp-content/uploads/2018/02/unknown-avatar.jpg`}
        style={{ width: "64px", height: "64px", margin: ".6rem 1rem" }}
      ></Avatar> */}
      <div style={{ display: "flex" }}>
        <video
          muted
          //@ts-ignore
          ref={userVideo}
          autoPlay
          playsInline
          style={{ width: "100px", height: "100px" }}
        />
        {peers.map((peer, index) => {
          return <Video key={index} peer={peer} muted={false} />;
        })}
      </div>
      <Button
        onClick={() => {
          toggleMuteAudio();
        }}
      >
        Mute
      </Button>
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
        <Avatar
          alt="Remy Sharp"
          src={`https://stylizedbay.com/wp-content/uploads/2018/02/unknown-avatar.jpg`}
          style={{ width: "64px", height: "64px", margin: ".6rem 1rem" }}
        ></Avatar>
      </div>
    </>
  );
};

// export default RoomII;

export default Room;
