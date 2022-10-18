<template>
      <navigation-bar></navigation-bar>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
// @ is an alias to /src
import navBar from '@/components/layouts/navbar.vue';

export default {
  name: 'AboutView',
  components: {
    "navigation-bar": navBar
}
}
</script>