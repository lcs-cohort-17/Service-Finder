// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPhm2p-zc8VM-J1a9oxVBaWhaZ1hTCKHE",
  authDomain: "service-finder-2432c.firebaseapp.com",
  projectId: "service-finder-2432c",
  storageBucket: "service-finder-2432c.firebasestorage.app",
  messagingSenderId: "180733371862",
  appId: "1:180733371862:web:9e99dce07b8fc48a48b077"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

