// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyOwQf9I5H7meB5daVUwCkZWNlJwymdZ8",
  authDomain: "myworkout-app-37f40.firebaseapp.com",
  projectId: "myworkout-app-37f40",
  storageBucket: "myworkout-app-37f40.appspot.com",
  messagingSenderId: "275918614431",
  appId: "1:275918614431:web:a46ba641e2a6b33cee57aa",
  measurementId: "G-BFPB503NE5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase();
// const firestore = getFirestore(app);
// export const firestoreDb = {
//   folders: firestore.collection("users"),
//   workouts: firestore.collection("workouts"),
// };
const analytics = getAnalytics(app);
