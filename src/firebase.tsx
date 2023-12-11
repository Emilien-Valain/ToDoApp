// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvY0tlE9-SJyDAQnbb8wllmTr8uhXpbSg",
  authDomain: "todoapp-75ac0.firebaseapp.com",
  projectId: "todoapp-75ac0",
  storageBucket: "todoapp-75ac0.appspot.com",
  messagingSenderId: "872934636338",
  appId: "1:872934636338:web:0271cd00fa9ca3155cf52b",
  measurementId: "G-060BNN6KGP",
  databaseURL: "https://todoapp-75ac0-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
