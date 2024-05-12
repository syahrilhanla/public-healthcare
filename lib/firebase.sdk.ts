// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgm_7ijL2mvJVFz54yEpGJj0F1P2cB3L4",
  authDomain: "puskesmas-9-nopember.firebaseapp.com",
  projectId: "puskesmas-9-nopember",
  storageBucket: "puskesmas-9-nopember.appspot.com",
  messagingSenderId: "237656117424",
  appId: "1:237656117424:web:1dadec0ba0fcb9d54d6b75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);

export enum DatabaseCollections {
  USERS = "users",
  INSPECTIONS = "inspections",
  TTDS = "ttds",
  HEALTH_CONTROL = "health-control",
  BULLYING = "bullying",
  STOP_SMOKING = "stop-smoking",
  PREGNANCY = "pregnancy"
}

export enum Sex {
  MALE = "Laki-laki",
  FEMALE = "Perempuan"
}