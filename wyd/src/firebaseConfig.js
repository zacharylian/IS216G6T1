import { initializeApp } from 'firebase/app';
// import { getDatabase } from "firebase/database";
// import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAFcWvrUIPgCm0nE6ot15rs9LHkMI_hyIE",
    authDomain: "is216g6t1.firebaseapp.com",
    projectId: "is216g6t1",
    storageBucket: "is216g6t1.appspot.com",
    messagingSenderId: "657023622754",
    appId: "1:657023622754:web:d6795a11c5e24ed83cbb3b",
    databaseURL: "https://is216g6t1-default-rtdb.firebaseio.com"
    };
  

const firebaseApp = initializeApp(firebaseConfig);

// const db = getDatabase();



export default firebaseApp