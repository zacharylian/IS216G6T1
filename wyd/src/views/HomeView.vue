<template>
  <section>
    <navigation-bar></navigation-bar>
    <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>Welcome to Your Vue.js App</p>
  </div>

  </section>
</template>

<script>
// @ is an alias to /src
import navBar from '@/components/layouts/navbar.vue';

export default {
  name: 'HomeView',
  components: {
    "navigation-bar": navBar
}
}
</script>
