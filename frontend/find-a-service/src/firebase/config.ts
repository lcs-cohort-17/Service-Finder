// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzMVK5OY_DUMrIy-0JAh8uVu1hXqqOMBw",
  authDomain: "service-bf1fc.firebaseapp.com",
  projectId: "service-bf1fc",
  storageBucket: "service-bf1fc.firebasestorage.app",
  messagingSenderId: "633517411699",
  appId: "1:633517411699:web:bfa765367abb03b4684906",
  measurementId: "G-Z1554EY91F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);