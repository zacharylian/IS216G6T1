<template>
  
  <div id="app" v-bind:class="currentTheme">
    <!-- {{currentTheme}} -->

    <div class="content-box">
      <div class="theme-switcher-wrap ">
        <div class="theme-switcher"
          v-bind:class="{'active':currentTheme === 'theme-dark'}"
          v-on:click="switchTheme"
        >
          <div class="switch-path">
            <div class="switch-handle"></div>
          </div>
        </div>
      </div>
    </div>

  </div>

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
