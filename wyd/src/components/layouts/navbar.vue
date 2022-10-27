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

      <navbar-link to="/" icon="fas fa-house fa-2x" class="homelink" :class="{active:isActive}, {home:!collapsed}">Home</navbar-link>
      <navbar-link to="/Calendar" icon="fas fa-calendar-days fa-2x" class="calendarlink" :class="{active:isActive}, {calendar:!collapsed}">Calendar</navbar-link> 
      <navbar-link to="/SpendingDashboard" icon="fas fa-sack-dollar fa-2x" class="spendingslink" :class="{active:isActive}, {spendings:!collapsed}">Spendings</navbar-link>
      <navbar-link to="/FocusTimer" icon="fas fa-stopwatch fa-3x" class="timerlink" :class="{active:isActive}, {timer:!collapsed}">Timer</navbar-link>

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

  .homelink{
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    bottom: 80px;
    font-weight: 700;
    user-select: none;

    margin: 6em 0;
    padding: 1.3em 0.2em ;
    border-radius: 0.2em;
    height: 2em;

    color: black;
    text-decoration: none;
    }

    .calendarlink{
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    bottom: 255px;
    font-weight: 700;
    user-select: none;

    margin: 6em 0;
    padding: 1.3em 0.2em ;
    border-radius: 0.2em;
    height: 2em;

    color: black;
    text-decoration: none;
    }
  
    .spendingslink{
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    bottom: 430px;
    font-weight: 700;
    user-select: none;

    margin: 6em 0;
    padding: 1.3em 0.2em ;
    border-radius: 0.2em;
    height: 2em;

    color: black;
    text-decoration: none;
    }

    .timerlink{
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;
    bottom: -110px;
    left: -48px;
    font-weight: 700;
    user-select: none;

    margin: 6em 0;
    padding: 1.3em 0.2em ;
    border-radius: 0.2em;
    height: 2em;

    color: black;
    text-decoration: none;
    }

    .homelink:hover, .calendarlink:hover, .spendingslink:hover,.timerlink:hover {
        background-color: var(--navbar-item-hover);
    }

    .homelink.active, .calendarlink.active, .spendingslink.active, .timerlink.active {
        background-color: var(--navbar-item-active);
    }

    .home{ 
      left: -10px;
    }

    .calendar {
      left:3px
    }

    .spendings {
      left:8px;
    }
    .timer {
      left: -134px;
    }
  
</style>
    
