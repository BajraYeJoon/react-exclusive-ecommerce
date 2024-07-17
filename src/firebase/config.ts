// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5Anlgdb-gM3F-Fnn6WSI5GXs83kWQmdM",
  authDomain: "exclusive-ecommerce-2a0ff.firebaseapp.com",
  projectId: "exclusive-ecommerce-2a0ff",
  storageBucket: "exclusive-ecommerce-2a0ff.appspot.com",
  messagingSenderId: "901344281143",
  appId: "1:901344281143:web:386aac808edf980eda35b2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
