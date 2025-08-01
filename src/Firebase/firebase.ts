// firebase.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB37XDhMANKb29xL6Ow-Wadmpbg2ZIsI_U",
  authDomain: "tvshow-77b26.firebaseapp.com",
  projectId: "tvshow-77b26",
  storageBucket: "tvshow-77b26.firebasestorage.app",
  messagingSenderId: "461283722759",
  appId: "1:461283722759:web:9b05888956becf0c338ca2",
  measurementId: "G-2FLX69P5D8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
