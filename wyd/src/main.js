import { createApp } from 'vue'

//calendar

import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGJWfFppR2NbfU53flVCal9WVAciSV9jS3xSdkZjWXhedXRRRmJcVw==');


//css
import "./assets/global.css";
import "./main.scss";
import "../src/LoginView.css";
import "../src/LoginView.scss";

// fontawesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

//chart.js (sorry am struggling i left the code in)
// import { Doughnut } from 'chart.js';
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import "./plugins/chart.js"

import App from './App.vue'
import router from './router'
import firebase from 'firebase/compat/app'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQIVALnpS36W4VrXUUBkOxNUrMN2NHIgk",
  authDomain: "is216-project-365912.firebaseapp.com",
  projectId: "is216-project-365912",
  storageBucket: "is216-project-365912.appspot.com",
  messagingSenderId: "578928448222",
  appId: "1:578928448222:web:f00f1a2dde51ad927d284f",
  measurementId: "G-BK1QG28M8Q"
};
createApp(App).use(router).mount('#app')

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export{ db }