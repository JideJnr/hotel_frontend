import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAiQ4Os-Wooi-kF6ShLRgthJ_vOuXYL_j0",
  authDomain: "bj-hotel-af728.firebaseapp.com",
  projectId: "bj-hotel-af728",
  storageBucket: "bj-hotel-af728.appspot.com",
  messagingSenderId: "876917889390",
  appId: "1:876917889390:android:135f43d4405b367dffc97f",
};

const app = initializeApp(firebaseConfig);

// Firebase Auth with persistence
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Error setting persistence:", error);
});

export const db = getFirestore(app);
export const storage = getStorage(app);
