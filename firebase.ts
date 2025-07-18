import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// NOTE:
// This is a placeholder configuration.
// Replace it with your project's Firebase credentials.
// You can find this in your Firebase project settings.
const firebaseConfig = {
  apiKey: "AIzaSyDE2tvJREPUEZWZU25k05qjT3gw0eBYq-E",
  authDomain: "timing-d8e1f.firebaseapp.com",
  projectId: "timing-d8e1f",
  storageBucket: "timing-d8e1f.firebasestorage.app",
  messagingSenderId: "237891338886",
  appId: "1:237891338886:web:22c5ff26c13e4c62444707",
  measurementId: "G-FBP964WLJ4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
