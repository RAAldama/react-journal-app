import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAg-gt0xFJtKI2uve9We55743hJQau2CRk",
    authDomain: "react-app-journal-4aa4a.firebaseapp.com",
    projectId: "react-app-journal-4aa4a",
    storageBucket: "react-app-journal-4aa4a.appspot.com",
    messagingSenderId: "703243419480",
    appId: "1:703243419480:web:c112c03b448c2702d6af2d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db, 
    googleAuthProvider, 
    firebase
}