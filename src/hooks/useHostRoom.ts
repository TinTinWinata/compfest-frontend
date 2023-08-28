import { FirebaseError } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../settings/firebase-setting';
import { toastFirebaseError } from '../settings/toast-setting';
import { servers } from '../settings/webrtc-setting';
import { screenshotVideoToFirebase } from '../utils/firebase-helper';
import useSkinCancer from './useSkinCancer';

export default function useHostRoom(callId: string, mode: string) {
  const pc = new RTCPeerConnection(servers);
  // Invite Mutation
  const link = import.meta.env.VITE_APP_LINK;
  const [webcamActive, setWebcamActive] = useState(false);
  const [isIncomeStream, setIsIncomeStream] = useState<boolean>(false);
  const { data, checkResult } = useSkinCancer();

  const navigate = useNavigate();
  const [roomId, setRoomId] = useState<any>(callId);

  const localRef = useRef<HTMLVideoElement>();
  const remoteRef = useRef<HTMLVideoElement | any>();

  const saveScreenshot = async (link: string) => {
    await updateDoc(doc(db, 'calls', callId), { result: link });
  };

  const screenshotRemote = async () => {
    if (remoteRef && remoteRef.current) {
      const result = await screenshotVideoToFirebase(remoteRef, callId);
      if (result !== '') saveScreenshot(result);
    }
  };

  const clearDb = async (): Promise<void> => {
    try {
      const offerSnapshot = await getDocs(getOfferRef());
      await Promise.all(
        offerSnapshot.docs.map(async (document) => {
          const docRef = doc(
            collection(db, `calls/${callId}/offerCandidates`),
            document.id
          );
          await deleteDoc(docRef);
        })
      );
      const answerSnapshot = await getDocs(getAnswerRef());
      await Promise.all(
        answerSnapshot.docs.map(async (document) => {
          const docRef = doc(
            collection(db, `calls/${callId}/answerCandidates`),
            document.id
          );
          await deleteDoc(docRef);
        })
      );
      const callRef = getCallDoc();
      await deleteDoc(callRef);
    } catch (err) {
      if (err instanceof FirebaseError) {
        toastFirebaseError(err);
      }
    }
  };

  const getCallDoc = () => doc(collection(db, 'calls'), callId);

  const getOfferRef = () =>
    collection(db, `calls/${getCallDoc().id}/offerCandidates`);

  const getAnswerRef = () =>
    collection(db, `calls/${getCallDoc().id}/answerCandidates`);

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
        track && setIsIncomeStream(true);
        remoteStream.addTrack(track);
      });
    };

    if (localRef.current) localRef.current.srcObject = localStream;
    if (remoteRef.current) remoteRef.current.srcObject = remoteStream;

    setWebcamActive(true);

    if (mode === 'create') {
      await clearDb();

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
        checkResult(data);
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
  return {
    remoteRef,
    hangUp,
    setupSources,
    isIncomeStream,
    screenshotRemote,
    data,
  };
}
