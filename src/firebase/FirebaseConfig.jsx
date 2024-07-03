import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjSbt4c0k8feCKmH4dZZUie65lWCjivJs",
  authDomain: "sparkle-store-f55b4.firebaseapp.com",
  projectId: "sparkle-store-f55b4",
  storageBucket: "sparkle-store-f55b4.appspot.com",
  messagingSenderId: "90216464524",
  appId: "1:90216464524:web:6980c49237ce4b65f4bba9",
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
export { fireDB, auth };
