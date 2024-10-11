// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0n5rkmB0Kp25Iit4PWuVxD-UM3BfxWBQ",
  authDomain: "chatapp-70715.firebaseapp.com",
  projectId: "chatapp-70715",
  storageBucket: "chatapp-70715.appspot.com",
  messagingSenderId: "990929240128",
  appId: "1:990929240128:web:fa432fc0c4ff64d9a7dfa5",
  measurementId: "G-4MVGRBR5EL"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);