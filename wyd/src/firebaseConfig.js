import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyAFcWvrUIPgCm0nE6ot15rs9LHkMI_hyIE",
    authDomain: "is216g6t1.firebaseapp.com",
    projectId: "is216g6t1",
    storageBucket: "is216g6t1.appspot.com",
    messagingSenderId: "657023622754",
    appId: "1:657023622754:web:d6795a11c5e24ed83cbb3b"
    };
  

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp