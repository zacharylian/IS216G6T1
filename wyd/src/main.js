import { createApp } from 'vue'

//css
import "./assets/global.css";
import "./main.scss";

// fontawesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'

//chart.js (sorry am struggling i left the code in)
// import { Doughnut } from 'chart.js';
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
// import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

import App from './App.vue'
import router from './router'
import firebase from 'firebase/compat/app'
import firebaseApp from './firebaseConfig';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
const analytics = getAnalytics(app);
// const analytics = getAnalytics(app);


// //oauth
// import GAuth from 'vue-google-oauth2'
// const gauthOption = {
//     clientId: 'http://1052372212245-o79mp68ok15900k15cra1203pchpa0ec.apps.googleusercontent.com',
//     scope: 'profile email',
//     prompt: 'select_account'
// }
// Vue.use(GAuth, gauthOption)

// use chart.js

//ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default firebaseApp