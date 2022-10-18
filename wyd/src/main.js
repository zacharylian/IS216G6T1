import { createApp } from 'vue'

//css
import "./assets/global.css";
import "./main.scss";

// fontawesome
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// bookstrap
import 'bootstrap/dist/css/bootstrap.min.css'



import App from './App.vue'
import router from './router'
import firebase from 'firebase/compat/app'
import firebaseApp from './firebaseConfig';

const firebaseConfig = {
apiKey: "AIzaSyBlSbe6yTYipPAPseBDfhz1W6oejJ0CH44",
authDomain: "wad-are-you-2-doing.firebaseapp.com",
projectId: "wad-are-you-2-doing",
storageBucket: "wad-are-you-2-doing.appspot.com",
messagingSenderId: "1052372212245",
appId: "1:1052372212245:web:73151e0ce3bdb2090a4c1c",
measurementId: "G-Z0D3RM89YM"
};
createApp(App).use(router).mount('#app')

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// //oauth
// import GAuth from 'vue-google-oauth2'
// const gauthOption = {
//     clientId: 'http://1052372212245-o79mp68ok15900k15cra1203pchpa0ec.apps.googleusercontent.com',
//     scope: 'profile email',
//     prompt: 'select_account'
// }
// Vue.use(GAuth, gauthOption)

export default firebaseApp