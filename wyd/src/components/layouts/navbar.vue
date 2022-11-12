<template>

    <!--             
                      <router-link to="/">Home</router-link> |
                      <router-link to="/AboutView">About</router-link> |
                      <router-link to="/SpendingDashboard">Spendings</router-link> |
                      <router-link to="/Calendar">Calendar</router-link> | -->
                      <!-- <button v-on:click="googleSignOut">Sign Out</button> -->
                
                    <div class="navbar" :style="{width:navbarWidth}">
                
                      <ul>
                      <!-- <li class="logo">
                        <span class="collapse-icon" :class="{'rotate-180': open}" @click="toggleNavbar">
                          <i class ="fas fa-angle-double-left fa-2x" />
                      </span>
                      </li> -->
                      <li><navbar-link to="/" icon="fas fa-house fa-2x"  >Home</navbar-link></li>
                      <li><navbar-link to="/Calendar" icon="fas fa-calendar-days fa-2x" >Calendar</navbar-link></li>
                      <li><navbar-link to="/SpendingDashboard" icon="fas fa-sack-dollar fa-2x"  >Spendings</navbar-link></li>
                      <li><navbar-link to="/FocusTimer" icon="fas fa-stopwatch fa-2x">Timer</navbar-link></li>
                      </ul>
                
                      <span class="logout-button" @click="googleSignOut">
                        <i class="fas fa-right-from-bracket fa-2x"></i>
                          <!-- <span v-if="!open" style="padding-left:5px; font-size: 16px; font-weight: 700;" >
                                  <slot>Logout</slot>
                          </span> -->
                      </span>
                      <span class="collapse-icon" :class="{'rotate-180': open}" @click="toggleNavbar">
                        <i class ="fas fa-angle-double-left fa-2x" />
                      </span>
                
                    </div>
                
                </template>
                
                <script>
                  import lightDark from './lightdark.vue';
                  import { getAuth, signOut } from "firebase/auth"
                
                  import navbarLink from './navbarLink'
                  import {open, toggleNavbar, navbarWidth} from './state'
                
                export default {
                  props: {},
                  setup() {
                    return {open, toggleNavbar, navbarWidth}
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
                    
                    :root {
                      --navbar-bg-color: #5E6EE6;
                      --navbar-item-hover: #4955B3;
                      --navbar-item-active: #5e71b4;
                    }
                
                    @import "../../main.scss";
                
                </style>
                
                <style scoped>
                  .logout-button {
                    position: absolute;
                    bottom: 5%;
                    padding: 0.75em;
                    margin-left:0.25em;
                    color: black;
                    cursor: pointer;
                    filter: grayscale(100%) opacity(0.6);
                  }
                
                  .logout-button:hover {
                    color: black;
                    filter: grayscale(0%) opacity(1)
                  }
                
                  .collapse-icon {
                    position: absolute;
                    bottom: 0;
                    padding: 0.75em;
                    margin-left:0.25em; 
                    color: black;
                    transition: 0.5s linear;
                    cursor: pointer;
                    filter: grayscale(100%) opacity(0.6);
                  }
                
                  .collapse-icon:hover {
                    color: black;
                    filter: grayscale(0%) opacity(1)
                  }
                
                  .rotate-180 {
                    transform: rotate(180deg);
                    transition: 0.2s linear;
                  }
                
                
                
                  .navbar {
                    background-color: var(--navbar-bg-color);
                    position: fixed;
                    top: 0;
                    left: 0;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    transition: 1s ease;
                  } 
                
                
                  .navbar li{
                    position: relative;
                    list-style: none;
                    margin-left:-20px;
                  } 
                
                
                
                  
                </style>
