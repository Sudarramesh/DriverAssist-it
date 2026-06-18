/// <reference types="vite/client" />

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "driverassist-it.firebaseapp.com",
  projectId: "driverassist-it",
  storageBucket: "driverassist-it.firebasestorage.app",
  messagingSenderId: "756419162598",
  appId: "1:756419162598:web:9e57c52dfb8c28652c6627",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);