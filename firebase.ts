// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/app';
import 'firebase/auth'; 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDO_lyrrhjjZ1kYxYSogFBDpZBK9WaKWh4",
  authDomain: "firestreamapp-7df03.firebaseapp.com",
  projectId: "firestreamapp-7df03",
  storageBucket: "firestreamapp-7df03.appspot.com",
  messagingSenderId: "946773410323",
  appId: "1:946773410323:web:d1a70e27d56903459335e6",
  measurementId: "G-Y0M7PMZ7BY"
};

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth,db };

// Your web app's Firebase configuration
