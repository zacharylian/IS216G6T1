import { createApp } from 'vue'

//css
import "./assets/global.css";
import "./main.scss";


import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')


const firebaseConfig = {
apiKey: "AIzaSyBlSbe6yTYipPAPseBDfhz1W6oejJ0CH44",
authDomain: "wad-are-you-2-doing.firebaseapp.com",
projectId: "wad-are-you-2-doing",
storageBucket: "wad-are-you-2-doing.appspot.com",
messagingSenderId: "1052372212245",
appId: "1:1052372212245:web:73151e0ce3bdb2090a4c1c",
measurementId: "G-Z0D3RM89YM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
