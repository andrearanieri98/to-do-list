// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"; // ✅ FIXED: added connectFirestoreEmulator

// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyAGHFfzcrDu9_686WDEcC3OdxTNIwcM3Ro",

  authDomain: "my-to-do-list-webapp1.firebaseapp.com",

  projectId: "my-to-do-list-webapp1",

  storageBucket: "my-to-do-list-webapp1.firebasestorage.app",

  messagingSenderId: "1074648646287",

  appId: "1:1074648646287:web:a03b5702a4d448fd11e6fa"

};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// ✅ Connect to emulators when running locally
if (window.location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
}
