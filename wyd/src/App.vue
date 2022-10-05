<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/login">Login</router-link>
  </nav>
  <router-view/>
</template>

<script>
  // import axios from 'axios';
  
  // import navbar from './components/layouts/navbar.vue';
  
  export default {
      name: 'App',
      data() {
        return {
          currentTheme: localStorage.getItem("theme-color")
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
