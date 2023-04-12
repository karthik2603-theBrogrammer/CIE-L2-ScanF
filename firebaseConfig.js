// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_11spFRCpnehHO94_9y7OrUh7JihYCdc",
  authDomain: "fir-basics-d5b46.firebaseapp.com",
  projectId: "fir-basics-d5b46",
  storageBucket: "fir-basics-d5b46.appspot.com",
  messagingSenderId: "607295964234",
  appId: "1:607295964234:web:6ef4e1f69508cdaa5b12b3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
