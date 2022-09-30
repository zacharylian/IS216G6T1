import { createApp } from 'vue'

//css
import "./assets/global.css";
import "./main.scss";


import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
