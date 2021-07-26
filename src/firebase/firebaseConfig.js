import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyBJtkR4m8yo_21DWBoYBZh2kzkTHlc3dWg",
    authDomain: "my-lego-54393.firebaseapp.com",
    projectId: "my-lego-54393",
    storageBucket: "my-lego-54393.appspot.com",
    messagingSenderId: "578875571797",
    appId: "1:578875571797:web:713482270bb330f6835edc"
};


//Inicializacion de Firebase
firebase.initializeApp( firebaseConfig );

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();

export {
    db,
    googleAuthProvider,
    facebookAuthProvider,
    firebase
}