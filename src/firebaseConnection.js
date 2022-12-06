// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const API_KEY = process.env.REACT_APP_API_KEY
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "reactnativefirebase-de561.firebaseapp.com",
  databaseURL: "https://reactnativefirebase-de561-default-rtdb.firebaseio.com",
  projectId: "reactnativefirebase-de561",
  storageBucket: "reactnativefirebase-de561.appspot.com",
  messagingSenderId: "264451843151",
  appId: "1:264451843151:web:3af25c91a65e41d188f63a"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = ref(getDatabase())
