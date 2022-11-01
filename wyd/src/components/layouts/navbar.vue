<template>

<!-- 
      <router-link to="/">Home</router-link> |
      <router-link to="/AboutView">About</router-link> |
      <router-link to="/SpendingDashboard">Spendings</router-link> |
      <router-link to="/Calendar">Calendar</router-link> | -->
      <button v-on:click="googleSignOut">Sign Out</button>

    <div class="navbar" :style="{width:navbarWidth}">
      <!-- <h1>
        <span v-if="collapsed">
          WAD
        </span>
        <span v-else>
          WAD ARE U 2 DOING
        </span>
      </h1> -->

      <ul>
      <li><navbar-link to="/" icon="fas fa-house fa-2x" class="link" :class="{active:isActive}" >Home</navbar-link></li>
      <li><navbar-link to="/Calendar" icon="fas fa-calendar-days fa-2x" class="link" :class="{active:isActive}">Calendar</navbar-link></li>
      <li><navbar-link to="/SpendingDashboard" icon="fas fa-sack-dollar fa-2x" class="link" :class="{active:isActive}">Spendings</navbar-link></li>
      <li><navbar-link to="/FocusTimer" icon="fas fa-stopwatch fa-2x" class="link" :class="{active:isActive}">Timer</navbar-link></li>
      </ul>
      <span class="collapse-icon" :class="{'rotate-180': collapsed}" @click="toggleNavbar">
        <i class ="fas fa-angle-double-left fa-2x" />
      </span>

    </div>

</template>

<script>
  import lightDark from './lightdark.vue';
  import { getAuth, signOut } from "firebase/auth"

  import navbarLink from './navbarLink'
  import {collapsed, toggleNavbar, navbarWidth} from './state'

export default {
  props: {},
  setup() {
    return {collapsed, toggleNavbar, navbarWidth}
  },
  name: "navBar",
  components: {
    'light-dark': lightDark,
    'navbar-link': navbarLink,
  },

  methods: {
    googleSignOut() {
          const auth = getAuth();
          signOut(auth).then(() => {
            // Sign-out successful.
            alert("Successful Sign Out")
            console.log(getAuth().currentUser)
            location.reload()
     
          }).catch((error) => {
            // An error happened.
            console.log(error)
          });
        },
  }
}

</script>


<style>
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
    
    /* nav {
      padding: 30px;
    }
    
    nav a {
      font-weight: bold;
      color: #2c3e50;
    }
    
    nav a.router-link-exact-active {
      color: #7289DA;
    } */

    :root {
      --navbar-bg-color: #7289DA;
      --navbar-item-hover: #6479c5;
      --navbar-item-active: #5e71b4;
    }

    @import "../../main.scss";

</style>

<style scoped>
  .collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75em;
    margin-left:0.5em;

    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center;  */
    
    color: black;

    transition: 0.2s linear;

    cursor: pointer;
  }

  .rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
  }

  .link{
    display: flex;
    align-items: center;
    /* justify-content: center; */
    cursor: pointer;
    position: relative;
    font-weight: 700;
    user-select: none;
    margin: 1.5em 0;
    /* padding: 1.3em 0.2em ; */
    /* margin-top: 20px; */
    border-radius: 0.2em;
    height: 2em;

    color: black;
    text-decoration: none;

    top: 0;
    height: 100%;
    }

  .navbar {
    color: white;
    background-color: var(--navbar-bg-color);
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: flex-start;
    transition: 0.3s ease;
    /* width: 300px; */
    /* display: flex;
    align-items: center;
    justify-content: center;  */
    /* transition: 0.3s ease; */
  } 
  
  /* .navbar_new {
    position:fixed;
    width: 100%;
    height: 100vh;
    top:0;
    left:0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--navbar-bg-color);
  } */
  .navbar li{
    position: relative;
    list-style: none;
    margin-left:-20px;
  } 
  
  .fadeOut {
        animation: fadeOut 0.3s;
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        } 

        to {
            opacity: 0;
        }
    }

  
</style>
    
