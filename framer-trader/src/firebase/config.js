import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Ensure all environment variables are loaded
const firebaseConfig = {
  apiKey: "AIzaSyDIL-ROF3Hl3loTWLXrBnsoY7xFPNgob5A",
  authDomain:"farmer-trader-com.firebaseapp.com" ,
  projectId: "farmer-trader-com",
  storageBucket: "farmer-trader-com.firebasestorage.app",
  messagingSenderId: "248701010575",
  appId:"1:248701010575:web:fa870469aa99f029cda6fa",
  measurementId:"G-X07NSG69HW"
};

// Debugging: Check if values are loaded correctly
console.log("Firebase Config:", firebaseConfig);

// Ensure required values are present before initializing Firebase
if (!firebaseConfig.projectId) {
  throw new Error("Missing Firebase Project ID in .env file!");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
