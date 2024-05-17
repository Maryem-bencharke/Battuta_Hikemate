// import { initializeApp } from "firebase/app";
// import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getDatabase } from 'firebase/database';
// import 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyB7bwE0fMVE7CH97TKGrueVLbHNuT3qvhM",
//   authDomain: "battuta-8b03e.firebaseapp.com",
//   databaseURL: "https://battuta-8b03e-default-rtdb.firebaseio.com",
//   projectId: "battuta-8b03e",
//   storageBucket: "battuta-8b03e.appspot.com",
//   messagingSenderId: "546536410892",
//   appId: "1:546536410892:web:4a75793b1d19419bf30329",
//   measurementId: "G-1GKW0XBEHB"
// };

// const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });

// const db = getDatabase(app);

// export { auth, db };


import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB7bwE0fMVE7CH97TKGrueVLbHNuT3qvhM',
  authDomain: 'battuta-8b03e.firebaseapp.com',
  databaseURL: 'https://battuta-8b03e-default-rtdb.firebaseio.com',
  projectId: 'battuta-8b03e',
  storageBucket: 'battuta-8b03e.appspot.com',
  messagingSenderId: '546536410892',
  appId: '1:546536410892:web:4a75793b1d19419bf30329',
  measurementId: 'G-1GKW0XBEHB'
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const firestore = getFirestore(app);

export { auth, firestore };

