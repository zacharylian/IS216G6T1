<template>

  <section>
    <navigation-bar/>
    <div :style="{'margin-left': navbarWidth}">
      <router-view />
    </div>

    <div style="padding:0px 0px 0px 80px">

      <div class="row">
        <div class="col pr-1">
          <div class="row">
            <h1 class="px-3 py-1" style="text-align:left;font-family:Georgia, 'Times New Roman', Times, serif;font-style:italic">hi, <b>krazywoman</b></h1>
          </div>
          <div class="row">
            <h3 class="py-2">upcoming events</h3>
            <div class="mx-3" style="border: 3px pink solid; height: 140px;border-radius:20px;margin:auto;">
            <br><br><h2>$40/$50</h2></div>
          </div>
          <div class="row">
            <div class="col py-2">
              <h3>expenses<br><br></h3>
              <div class="mx-3" style="border: 3px pink solid; height: 140px;border-radius:20px;margin:auto;">
              <br><br><h2>$40/$50</h2></div>
              <!--just here for Mockup purposes-->
              <br>
              </div>
            <div class="col py-2">
              <h3>focus time today</h3><br>
              <div style="border: 15px pink solid; height: 140px;width:140px;border-radius:70px;margin:auto;"></div>
              <!--just here for Mockup purposes-->
              <br>
            </div>
          </div>
        </div>
        <div class="col">
          <h2 class="py-2">to-do list</h2>
          <todo></todo>          
        </div>
      </div>
</div>

  </section>

</template>


<script>
// @ is an alias to /src
import navBar from '@/components/layouts/navbar.vue';
import {navbarWidth} from '@/components/layouts/state';

import todo from '@/components/layouts/todo.vue';

export default {
  name: 'HomeView',
  components: {
    "navigation-bar": navBar,
    "todo": todo,
  },
  setup() {
    return {navbarWidth}
  } 
}

</script>