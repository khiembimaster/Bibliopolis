// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from"firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfw9GMNlZH4wfLKxMRq9W1TG6j7ud5PNE",
  authDomain: "biblipolis.firebaseapp.com",
  projectId: "biblipolis",
  storageBucket: "biblipolis.appspot.com",
  messagingSenderId: "747802156609",
  appId: "1:747802156609:web:401cac4fe4120ada7eb0c0",
  measurementId: "G-WCSS1ZK489"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);