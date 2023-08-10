import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDCBsp_7_Dg0SmHoVCRTvJHgpPW2HLDx6s',
  authDomain: 'diagno-ai-de3c3.firebaseapp.com',
  projectId: 'diagno-ai-de3c3',
  storageBucket: 'diagno-ai-de3c3.appspot.com',
  messagingSenderId: '41220842065',
  appId: '1:41220842065:web:51634d3caa8a674c61ce70',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
