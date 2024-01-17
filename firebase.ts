import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBHzq-Fq5wCdKQ9i1VVgaHb8HN1LpM6DuM",
    authDomain: "dumpdrive-fc3e1.firebaseapp.com",
    projectId: "dumpdrive-fc3e1",
    storageBucket: "dumpdrive-fc3e1.appspot.com",
    messagingSenderId: "392890210830",
    appId: "1:392890210830:web:3b0049f38a0125631d7a5f"
  };

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  
  const db = getFirestore(app)
  const storage = getStorage(app)

  export {db, storage}