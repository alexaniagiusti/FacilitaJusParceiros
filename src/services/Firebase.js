import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyBUaYNClSABpqziITNwFJfQ49DBzOemn3w',
  authDomain: 'egestor-876cd.firebaseapp.com',
  databaseURL: 'https://egestor-876cd.firebaseio.com',
  projectId: 'egestor-876cd',
  storageBucket: '',
  messagingSenderId: '529575315507',
  appId: '1:529575315507:web:b4202d8714379a49',
};

const f = firebase.initializeApp(config);

export const db = f.database();
export const auth = f.auth();
export const storage = f.storage();
