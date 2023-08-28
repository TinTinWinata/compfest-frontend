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
import { useNavigate } from 'react-router-dom';
import { db } from '../settings/firebase-setting';
import { servers } from '../settings/webrtc-setting';
import { screenshotVideoToFirebase } from '../utils/firebase-helper';
import useSkinCancer from './useSkinCancer';

export default function useJoinRoom(callId: string, mode: string) {
  const pc = new RTCPeerConnection(servers);
  // Invite Mutation
  const link = import.meta.env.VITE_APP_LINK;
  const [webcamActive, setWebcamActive] = useState(false);
  const { checkResult, data } = useSkinCancer();

  const navigate = useNavigate();
  const [roomId, setRoomId] = useState<any>(callId);

  const localRef = useRef<any>();
  const remoteRef = useRef<any>();

  const saveScreenshot = async (link: string) => {
    await setDoc(doc(db, 'calls', callId), { result: link });
  };

  const screenshotLocal = async () => {
    if (localRef && localRef.current) {
      const result = await screenshotVideoToFirebase(localRef, callId);
      if (result !== '') saveScreenshot(result);
    }
  };

  const setupSources = async () => {
    const callDoc = doc(collection(db, 'calls'), callId);
    onSnapshot(callDoc, (snapshot: any) => {
      const data = snapshot.data();
      checkResult(data);
    });

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

    if (localRef.current) localRef.current.srcObject = localStream;
    if (remoteRef.current) remoteRef.current.srcObject = remoteStream;

    setWebcamActive(true);

    if (mode === 'create') {
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
        event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

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
  return {
    remoteRef,
    hangUp,
    setupSources,
    localRef,
    webcamActive,
    screenshotLocal,
    data,
  };
}
