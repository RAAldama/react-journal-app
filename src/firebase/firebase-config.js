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

const firebaseConfigTesting = {
    apiKey: "AIzaSyCjoPTXghgfP6fGqLoYR57Jfh20NCosc9A",
    authDomain: "fb-react-app-b6af6.firebaseapp.com",
    databaseURL: "https://fb-react-app-b6af6.firebaseio.com",
    projectId: "fb-react-app-b6af6",
    storageBucket: "fb-react-app-b6af6.appspot.com",
    messagingSenderId: "835889335544",
    appId: "1:835889335544:web:2bf132d256d1c11dab7f0d"
};

if(process.env.NODE_ENV === 'test'){
    //base de datos para TESTING
    firebase.initializeApp(firebaseConfigTesting);
}else{
    //base de datos para NORMAL
    firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db, 
    googleAuthProvider, 
    firebase
}