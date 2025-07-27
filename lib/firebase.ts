// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDE2tvJREPUEZWZU25k05qjT3gw0eBYq-E",
  authDomain: "timing-d8e1f.firebaseapp.com",
  projectId: "timing-d8e1f",
  storageBucket: "timing-d8e1f.firebasestorage.app",
  messagingSenderId: "237891338886",
  appId: "1:237891338886:web:22c5ff26c13e4c62444707",
  measurementId: "G-FBP964WLJ4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);