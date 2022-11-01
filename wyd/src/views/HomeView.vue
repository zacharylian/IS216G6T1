<template>

  <section>
    <navigation-bar/>
    <div :style="{'margin-left': navbarWidth}">
      <router-view />
    </div>

    <div class="pt-3 mw-100" style="margin:0px 0px 0px 80px">

<div class="row">
  <div class="col col-8">
          <div class="row">
            <div class="col bg wanbottom">
            <!--NAME-->
            <h1 class="px-3 py-1" style="text-align:left;font-family:Georgia, 'Times New Roman', Times, serif;font-style:italic">hi, <b>{{this.username}}</b></h1>
          </div></div>
          <div class="row">
            <div class="col bg wanbottom pb-4">
            <!--UPCOMING EVENTS-->
            <h3 class="py-2">upcoming events</h3>
            <div class="mx-3" style="border: 3px pink solid; height: 140px;border-radius:20px;margin:auto;">
            <br><br><h2>upcoming events</h2></div>
          </div>
          </div>
          <div class="row">
            <div class="col py-2 bg wanright">
              <!--EXPENSES-->
              <h3>expenses<br><br></h3>
              <div class="mx-3" style="border: 3px pink solid; height: 140px;border-radius:20px;margin:auto;">
              <br><br><h2>$40/$50</h2></div>
              <br>
              </div>
              <div class="col py-2 bg wanright">
              <!--FOCUS TIME TODAY-->
              <h3>focus time today</h3><br>
              <div style="border: 15px pink solid; height: 140px;width:140px;border-radius:70px;margin:auto;"></div>
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

  </section>

</template>


<script>
// @ is an alias to /src
import navBar from '@/components/layouts/navbar.vue';
import {collapsed, toggleNavbar, navbarWidth} from '@/components/layouts/state';

import todo from '@/components/layouts/todo.vue';
import { getAuth } from '@firebase/auth';

export default {
  name: 'HomeView',
  components: {
    "navigation-bar": navBar,
    "todo": todo,
  },
  setup() {
    return {navbarWidth}
  },
  data() {return {
    username: getAuth().currentUser.displayName
  }},
}

</script>

<style>
 
 
</style>