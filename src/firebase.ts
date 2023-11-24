// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDhNvcLm8Gp3IgaTEcnttv4JWu3sPUwREE',
  authDomain: 'notes-85352.firebaseapp.com',
  projectId: 'notes-85352',
  storageBucket: 'notes-85352.appspot.com',
  messagingSenderId: '725473016348',
  appId: '1:725473016348:web:3970867afa194e06c43dd9',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
