// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { 
  getFirestore, 
  collection, 
  doc,
  getDocs, 
  addDoc, 
  updateDoc,
  deleteDoc,
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA6Toofq1A0qDUgJFimU6C0aZuz-L1RuN8",
  authDomain: "echo-4bc7e.firebaseapp.com",
  projectId: "echo-4bc7e",
  storageBucket: "echo-4bc7e.firebasestorage.app",
  messagingSenderId: "206573954980",
  appId: "1:206573954980:web:f9d5ab978e12bd83664331",
  measurementId: "G-7MLE8EGBM7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
};
