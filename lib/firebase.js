// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDd_z4RWcug-ftitXbEOoNatW5tt0Ip_cU",
  authDomain: "scriptworks-1df69.firebaseapp.com",
  projectId: "scriptworks-1df69",
  storageBucket: "scriptworks-1df69.appspot.com", // ✅ แก้ตรงนี้
  messagingSenderId: "103027674995",
  appId: "1:103027674995:web:8dc9408f403ad7e1197f06",
  measurementId: "G-WQ99TPBTRQ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
