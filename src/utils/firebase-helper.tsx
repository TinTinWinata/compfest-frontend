import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { MutableRefObject } from 'react';
import { storage } from '../settings/firebase-setting';

export const screenshotVideoToFirebase = async (
  remoteRef: MutableRefObject<HTMLVideoElement | undefined>,
  fileName: string
): Promise<string> => {
  if (remoteRef.current) {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(remoteRef.current, 0, 0, canvas.width, canvas.height);
      const storageRef = ref(storage, `skin-cancer/${fileName}`);
      return new Promise((resolve, reject) => {
        canvas.toBlob(async function (blob: any) {
          await uploadBytes(storageRef, blob);
          const url = await getDownloadURL(storageRef);
          resolve(url);
        }, 'image/jpeg');
      });
    }
  }
  return '';
};
