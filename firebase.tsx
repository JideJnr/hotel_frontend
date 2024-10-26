import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvx-VlIS2CeHBQvC-Djcx4mc0sNWCAe3M",
  authDomain: "bj-hotel-af728.firebaseapp.com",
  projectId: "bj-hotel-af728",
  storageBucket: "bj-hotel-af728.appspot.com",
  messagingSenderId: "876917889390",
  appId: "1:876917889390:web:052cbf79cb8de34cffc97f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
