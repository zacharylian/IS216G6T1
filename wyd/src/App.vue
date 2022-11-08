

<script>
  // import axios from 'axios';
  
  import navBar from '@/components/layouts/navbar.vue';
  import {navbarWidth} from '@/components/layouts/state'
  import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth"
  import router from './router';


  

  export default {
      name: 'App',
      components: {
        'navigation-bar': navBar,
        setup() {
          return {navbarWidth}
        }
    },
      data() {
        return {
          currentTheme: localStorage.getItem("theme-color"),
        };
      },
      methods: {
        switchTheme() {
          const storedTheme = localStorage.getItem("theme-color");
          if (storedTheme === "theme-dark") {
            localStorage.setItem("theme-color", "theme-light");
            this.currentTheme = localStorage.getItem("theme-color");
          } else {
            localStorage.setItem("theme-color", "theme-dark");
            this.currentTheme = localStorage.getItem("theme-color");
          }
        }
      }
  };
</script>

<template>
  <!-- <navigation-bar /> -->
  <div>
    <router-view/>
  </div>
</template>

  
<style>
  html {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  #app {
    font-family: Arial, Helvetica, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }
  h5.title {
    font-size: 22px;
    margin: 0;
    padding: 20px 0 0 0;
  }
  @import "./assets/global.css";
</style>
