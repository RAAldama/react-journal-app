import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

/*

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

*/

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db, 
    googleAuthProvider, 
    firebase
}