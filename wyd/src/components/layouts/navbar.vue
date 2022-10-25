<template>

    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/AboutView">About</router-link> |
      <router-link to="/SpendingDashboard">Spendings</router-link> |
      <router-link to="/Calendar">Calendar</router-link> |
      <button v-on:click="googleSignOut">Sign Out</button>
      <light-dark></light-dark>
    </nav>

</template>

<script>
  import lightDark from './lightdark.vue';
  import { getAuth, signOut } from "firebase/auth"

export default {
  name: "navBar",
  components: {
    'light-dark': lightDark
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
    
    nav {
      padding: 30px;
    }
    
    nav a {
      font-weight: bold;
      color: #2c3e50;
    }
    
    nav a.router-link-exact-active {
      color: #7289DA;
    }


    @import "../../main.scss";

    </style>
    
