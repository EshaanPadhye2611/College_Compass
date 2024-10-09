// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import Firebase Auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4ot3aPwHYvX4TMDoINxuEM7hHYALRiJc",
  authDomain: "college-compass-5e968.firebaseapp.com",
  projectId: "college-compass-5e968",
  storageBucket: "college-compass-5e968.appspot.com",
  messagingSenderId: "540268580981",
  appId: "1:540268580981:web:118944929371a3cfa0283c",
  measurementId: "G-NCZDB557ED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Auth

export { auth }; // Export the auth module for use in your application
