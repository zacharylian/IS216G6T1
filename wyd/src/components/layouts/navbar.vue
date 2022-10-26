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
          <i class="fas fa-bars"></i>
        </span>
        <span v-else>
          NavBar
        </span>
      </h1> -->

      <navbar-link to="/" icon="fas fa-house">Home</navbar-link>
      <navbar-link to="/Calendar" icon="fas fa-calendar-days">Calendar</navbar-link> 
      <navbar-link to="/SpendingDashboard" icon="fas fa-sack-dollar">Spendings</navbar-link>

      <span class="collapse-icon" :class="{'rotate-180': collapsed}" @click="toggleNavbar">
        <i class ="fas fa-angle-double-left" />
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
  .navbar {
    color: white;
    background-color: var(--navbar-bg-color);

    float: left;
    position: fixed;
    z-index: 1;
    top:0;
    left: 0;
    bottom: 0;
    padding: 0.5em;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
  }
  .collapse-icon {
    position: absolute;
    bottom: 0;
    padding: 0.75em;
    
    color: black;

    transition: 0.2s linear;

    cursor: pointer;
  }

  .rotate-180 {
    transform: rotate(180deg);
    transition: 0.2s linear;
  }

  
</style>
    
