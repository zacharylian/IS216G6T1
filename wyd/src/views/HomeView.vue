<template>


  <nav class="navbar_main">
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link to="/" class="nav-link">
          <i class="fas fa-house fa-2x" />
          <span class="link-text" >
                Home
          </span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/Calendar" class="nav-link">
          <i class="fas fa-calendar-days fa-2x" />
          <span class="link-text" >
                Calendar
          </span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/SpendingDashboard" class="nav-link">
          <i class="fas fa-sack-dollar fa-2x" />
          <span class="link-text" >
                Spendings
          </span>
        </router-link>
      </li>

      <li class="nav-item">
        <router-link to="/FocusTimer" class="nav-link">
          <i class="fas fa-stopwatch fa-2x" />
          <span class="link-text" >
                Timer
          </span>
        </router-link>
      </li>

      <li class="nav-item">
        <a href="#" class="nav-link">
          <span @click="googleSignOut">
            <i class="fas fa-right-from-bracket fa-2x" @click="googleSignOut"></i>
          </span>
        </a>
      </li>

    </ul>
  </nav>
  <div style="margin-left:6rem">
  <div class="pt-3 mw-100">

<div class="row" >
  <div class="col col-8">
          <div class="row">
            <div class="col bg wanbottom">
            <!--NAME-->
            <h1 class="px-3 py-1" style="text-align:left;font-family:Georgia, Times, serif;font-style:italic">hi, <b>{{this.username}}</b></h1>
          </div></div>
          <div class="row">
            <div class="col bg wanbottom pb-4">
            <!--UPCOMING EVENTS-->
            <h3 class="py-2">upcoming events</h3>
            <div class="mx-3" style="margin:auto;">
            today is {{ this.date.getFullYear() }}-{{ this.date.getMonth() +1 }}-{{ this.date.getDate() }}</div>
          </div>
          </div>
          <div class="row">
            <div class="col py-2 bg wanright">
              <!--EXPENSES-->
              <h3>expenses<br><br></h3>
              <div class="mx-3" style="margin:auto;">
              <br><br><h2>$40/$50</h2></div>
              <br>
              </div>
              <div class="col py-2 bg wanright">
              <!--FOCUS TIME TODAY-->
              <h3>focus time today</h3><br>
              <div style="border: 15px pink solid; height: 140px;width:140px;border-radius:70px;margin:auto;">100%</div>
              <br>
            </div>
          </div>
        </div>
        <div class="col col-4 bg">
          <h2 class="p-2">to-do list</h2>
          <todo></todo>          
        </div>
      </div>
</div>
</div>

</template>


<script>
// @ is an alias to /src
// import {open, toggleNavbar, navbarWidth} from '@/components/layouts/state';
// import navBar from '@/components/layouts/navbar.vue';

import todo from '@/components/layouts/todo.vue';
import { getAuth, signOut } from '@firebase/auth';

export default {
  name: 'HomeView',
  components: {
    "todo": todo,
    // 'navigation-bar': navBar,
  },
  // setup() {
  //   return {open, toggleNavbar, navbarWidth}
  // },
  data() {return {
    username: getAuth().currentUser.displayName,
    date: new Date(),
  }},

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

</style>