import React, { useEffect, useRef, createRef, useState } from 'react';
import io from 'socket.io-client';
import Peer, { Instance, SignalData, SimplePeer, Options } from 'simple-peer';
import styled from 'styled-components';
import { socket } from 'service/socket';
import { Avatar } from '@material-ui/core';

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

const Container = styled.div`
  padding: 20px;
  display: flex;
  height: 100vh;
  width: 90%;
  margin: auto;
  flex-wrap: wrap;
`;

const Video = ({ peer, muted }: { peer: Instance; muted: boolean }) => {
  const ref = useRef({} as MediaSrcType);

  useEffect(() => {
    peer.on('stream', (stream: MediaStream) => {
      ref.current.srcObject = stream;
    });
  }, []);
  //@ts-ignore
  return <video muted={muted} playsInline autoPlay ref={ref} />;
};

export const Room = ({ params }: { params: string }) => {
  const [peers, setPeers] = useState<Instance[]>([]);
  const userAudio = useRef({} as MediaSrcType);
  const peersRef = useRef([] as PeerRefType[]);
  const roomID = params;

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        userAudio.current.srcObject = stream;

        // okay we are joining a room with the given room id huh
        socket.emit('join-room', roomID);
        // fetching all the users from the socker io server
        socket.on('all-users', (users: string[]) => {
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

        socket.on('user joined', (payload: UserJoinedPayload) => {
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

        socket.on(
          'receiving returned signal',
          (payload: ReturnSignalPayload) => {
            const item = peersRef.current.find((p) => p.peerID === payload.id);
            if (item) item.peer.signal(payload.signal);
          }
        );
      });
  }, []);

  function createPeer(
    userToSignal: string,
    callerID: string,
    stream: MediaStream
  ) {
    const peer = new Peer({
      // true if this is the peer initiating the connection -- immediately on construction the signal sends out
      initiator: true,
      trickle: false,
      stream,
      // stream is out audio/video object
    });

    // immediately on construction of the peer it emits an event called signal we need to listen to that event and send data to the serfver
    peer.on('signal', (signal) => {
      socket.emit('sending signal', {
        userToSignal, // user ID of the people who are already in the room
        callerID, // our own socket id
        signal, // sending the signal data
      });
    });

    return peer;
  }

  function addPeer(
    incomingSignal: SignalData,
    callerID: string,
    stream: MediaStream
  ) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      socket.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <Container>
      {
        //@ts-ignore
        <Video muted={true} ref={userAudio} autoPlay playsInline />
      }
      {peers.map((peer, index) => {
        return <Video key={index} peer={peer} muted={true} />;
      })}
    </Container>
  );
};

const RoomII = ({ id }: { id: string }) => {
  console.log(id);
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={`https://stylizedbay.com/wp-content/uploads/2018/02/unknown-avatar.jpg`}
          style={{ width: '96px', height: '96px', margin: '.6rem 1rem' }}
        ></Avatar>
        <Avatar
          alt="Remy Sharp"
          src={`https://stylizedbay.com/wp-content/uploads/2018/02/unknown-avatar.jpg`}
          style={{ width: '96px', height: '96px', margin: '.6rem 1rem' }}
        ></Avatar>
        <Avatar
          alt="Remy Sharp"
          src={`https://stylizedbay.com/wp-content/uploads/2018/02/unknown-avatar.jpg`}
          style={{ width: '96px', height: '96px', margin: '.6rem 1rem' }}
        ></Avatar>
      </div>
    </>
  );
};

export default RoomII;
