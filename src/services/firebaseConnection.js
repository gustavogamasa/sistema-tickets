import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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
if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
console.log(`Firebase - Conexão iniciada`);
} else {
  console.log(`Firebase - Conexão já existente`);
}

export default firebase;

