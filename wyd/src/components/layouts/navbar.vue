<template>

    <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/AboutView">About</router-link> |
        <router-link to="/LoginView">Login</router-link> |
        <router-link to="/SpendingDashboard">Spendings</router-link>
        <!-- <a class="nav-item" href="/HomeView.vue">Home</a> |
        <a class="nav-item" href="/AboutView.vue">About</a> |
        <a class="nav-item" href="/LoginView.vue">Login</a> |
        <a class="nav-item" href="/SpendingsDashboard.vue">Spendings</a> -->
        <light-dark></light-dark>
    </nav>

</template>

<script>
  import lightDark from './lightdark.vue';

export default {
  name: "navBar",
  components: {
    'light-dark': lightDark
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
      color: #42b983;
    }


    @import "../../main.scss";

    </style>
    
