<template>
  <section>
    <navigation-bar></navigation-bar>
    <!-- <div class="home">
      <img alt="Vue logo" src="../assets/logo.png">
      <p>Welcome to Your Vue.js App</p>
    </div> -->

    <table border="1px solid black">
      <tr>
        <td colspan="2">
          <h1>hi krazywoman</h1>
        </td>
        <td rowspan="3">
          to-do list
        </td>
      </tr>
      <tr>
        <td>expenses</td>
        <td>progress circle</td>
      </tr>
      <tr>
        <td colspan="2">
          spotify section
        </td>
      </tr>
    </table>
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
