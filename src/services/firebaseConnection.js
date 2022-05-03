import firebase from "firebase/app";
import 'firebase/auth'
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";


const firebaseConfig = {
    apiKey: "AIzaSyAfra1v2vaRRYMJ3OMHI7Erkne8H9-OHiA",
    authDomain: "sistema-gustavo.firebaseapp.com",
    projectId: "sistema-gustavo",
    storageBucket: "sistema-gustavo.appspot.com",
    messagingSenderId: "805373742078",
    appId: "1:805373742078:web:993504d982d1d0612b4eaf",
    measurementId: "G-JYMJD5W77L"
  };

  // Initialize Firebase
  if(!firebase.app.length){
  const app = initializeApp(firebaseConfig);
  console.log("FIREBASE - Started")
  } else console.log("FIREBASE - Already running")

  export default firebase;