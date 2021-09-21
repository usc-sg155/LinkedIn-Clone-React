// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2pxRlC26U_IktHAbVOijfl4b7yf9x0Bg",
  authDomain: "linkedin-clone-react-a48de.firebaseapp.com",
  projectId: "linkedin-clone-react-a48de",
  storageBucket: "linkedin-clone-react-a48de.appspot.com",
  messagingSenderId: "229122187912",
  appId: "1:229122187912:web:ae3e84477f2c5cacb2b53d",
  measurementId: "G-CE7E5H7X2X",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
