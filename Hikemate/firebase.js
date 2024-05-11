// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7bwE0fMVE7CH97TKGrueVLbHNuT3qvhM",
  authDomain: "battuta-8b03e.firebaseapp.com",
  databaseURL: "https://battuta-8b03e-default-rtdb.firebaseio.com",
  projectId: "battuta-8b03e",
  storageBucket: "battuta-8b03e.appspot.com",
  messagingSenderId: "546536410892",
  appId: "1:546536410892:web:4a75793b1d19419bf30329",
  measurementId: "G-1GKW0XBEHB"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// export { auth };

const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
