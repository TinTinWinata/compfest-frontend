import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useRef, useState } from 'react';
import { FaCopy, FaEllipsisV, FaPhone } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/room.css';
import { db } from '../settings/firebase-setting';
import { toastSuccess } from '../settings/toast-setting';

// Initialize WebRTC
const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export function Room({ mode, callId }: { mode: any; callId: any }) {
  const pc = new RTCPeerConnection(servers);
  // Invite Mutation
  const link = import.meta.env.VITE_APP_LINK;
  const [webcamActive, setWebcamActive] = useState(false);
  const { id, time } = useParams<any>();

  if (callId === undefined || callId === null || callId === '') {
    callId = id;
  }
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState<any>(callId);

  const localRef = useRef<any>();
  const remoteRef = useRef<any>();

  const setupSources = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    const remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event: any) => {
      event.streams[0].getTracks().forEach((track: any) => {
        remoteStream.addTrack(track);
      });
    };

    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;

    setWebcamActive(true);

    if (mode === 'create') {
      const callDoc = doc(collection(db, 'calls'), callId);
      const offerCandidates = collection(
        db,
        `calls/${callDoc.id}/offerCandidates`
      );

      const answerCandidates = collection(
        db,
        `calls/${callDoc.id}/answerCandidates`
      );

      setRoomId(callDoc.id);

      pc.onicecandidate = (event: any) => {
        // event.candidate && offerCandidates.add(event.candidate.toJSON());
        event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      // await callDoc.set({ offer });
      await setDoc(callDoc, { offer });
      onSnapshot(callDoc, (snapshot: any) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      onSnapshot(answerCandidates, (snapshot: any) => {
        snapshot.docChanges().forEach((change: any) => {
          if (change.type === 'added') {
            const data = change.doc.data();
            if (data) {
              const candidate = new RTCIceCandidate(data);
              pc.addIceCandidate(candidate);
            }
          }
        });
      });
    } else if (mode === 'join') {
      const callDoc = doc(db, 'calls', callId);
      const answerCandidates = collection(
        db,
        'calls',
        callId,
        'answerCandidates'
      );
      const offerCandidates = collection(
        db,
        'calls',
        callId,
        'offerCandidates'
      );
      pc.onicecandidate = (event: any) => {
        event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
      };

      // const callData = (await callDoc.get()).data();
      const callData = (await getDoc(callDoc)).data();

      if (callData?.offer) {
        const offerDescription = callData.offer;
        await pc.setRemoteDescription(
          new RTCSessionDescription(offerDescription)
        );
      }

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await updateDoc(callDoc, { answer });

      onSnapshot(offerCandidates, (snapshot: any) => {
        snapshot.docChanges().forEach((change: any) => {
          if (change.type === 'added') {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }

    pc.onconnectionstatechange = (event: any) => {
      if (pc.connectionState === 'disconnected') {
        hangUp();
      }
    };
  };

  const hangUp = async () => {
    pc.close();
    if (roomId) {
      const roomRef = doc(db, 'calls', roomId);
      deleteDoc(roomRef);
      const pathname = window.location.pathname;
      if (pathname === '/create-room') {
        window.location.reload();
      } else {
        navigate('/home');
      }
    }
  };

  return (
    <div className="room">
      <video ref={localRef} autoPlay playsInline className="local" muted />
      <video ref={remoteRef} autoPlay playsInline className="remote" />

      <div className="buttonsContainer">
        <button
          onClick={hangUp}
          disabled={!webcamActive}
          className="hangup button"
        >
          <FaPhone className="phone-icon" />
        </button>
        <div tabIndex={0} role="button" className="more button">
          <FaEllipsisV className="ellipsis-icon" />
          <div className="popover">
            <button
              onClick={() => {
                navigator.clipboard.writeText(link + '/room/' + roomId);
                toastSuccess('Coppied to clipboard!');
              }}
            >
              <FaCopy /> Copy joining code
            </button>
          </div>
        </div>
      </div>

      {!webcamActive && (
        <div className="modalContainer">
          <div className="modal">
            <h3>Turn on your camera and microphone and start the call</h3>
            <div className="container">
              <button
                onClick={() => navigate('/create-room')}
                className="secondary"
              >
                Cancel
              </button>
              <button className="bg-primary text-white" onClick={setupSources}>
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
