import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_APIKEY,
//   authDomain: process.env.REACT_APP_AUTHDOMAIN,
//   projectId: process.env.REACT_APP_PROJECTID,
//   storageBucket: process.env.REACT_APP_STORAGEBUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
//   appId: process.env.REACT_APP_APPID,
//   measurementId: process.env.REACT_APP_MEASUREMENTID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyBD8KMJk7-q9_0CqLhoWK4-SinAQ4nT-3Y',
  authDomain: 'timong-a2e9b.firebaseapp.com',
  projectId: 'timong-a2e9b',
  storageBucket: 'timong-a2e9b.appspot.com',
  messagingSenderId: '1026357510086',
  appId: '1:1026357510086:web:6f1545039f7242519dbcc7',
  measurementId: 'G-DDH2BYWN3S',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dbService = getFirestore();
