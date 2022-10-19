<template>

  <section>
    <navigation-bar></navigation-bar>

    <div class="px-5">
    <table class="table table-bordered" style="width:100%">
      <tbody>
      <tr>
        <td colspan="2">
          <h1 class="px-3 py-1" style="text-align:left;font-family:Georgia, 'Times New Roman', Times, serif;font-style:italic">hi, <b>krazywoman</b></h1>
        </td>
        <td rowspan="3">
          <h2 class="py-2">to-do list</h2>

          <table class="table table-bordered">
            <!--just here for Mockup purposes-->
            <thead>
              <tr>
                <th>#</th>
                <th>task name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  1
                </td>
                <td>
                  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style="float:right">
                <label for="vehicle1">I have a bike</label></td>          
              </tr>
              <tr>
                <td>
                  2
                </td>
                <td>
                  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style="float:right">
                <label for="vehicle1">I have a bike</label></td>         
              </tr>
              <tr>
                <td>
                  3
                </td>
                <td>
                  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style="float:right">
                <label for="vehicle1">I have a bike</label></td>
              </tr>
              <tr>
                <td>
                  4
                </td>
                <td>
                  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style="float:right">
                <label for="vehicle1">I have a bike</label></td>      
              </tr>
              <tr>
                <td>
                  5
                </td>
                <td>
                  <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" style="float:right">
                <label for="vehicle1">I have a bike</label></td>
                </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr>
        <td colspan="2">
          <h3 class="py-2">upcoming events</h3>
          <div class="mx-3" style="border: 3px pink solid; height: 140px;border-radius:20px;margin:auto;">
          <br><br><h2>$40/$50</h2></div>
          <!--just here for Mockup purposes-->
          <br>
        </td>
      </tr>

      <tr>
        <td><h3>expenses<br><br></h3>
          <div class="mx-3" style="border: 3px pink solid; height: 140px;border-radius:20px;margin:auto;">
          <br><br><h2>$40/$50</h2></div>
          <!--just here for Mockup purposes-->
          <br>
        
</td>
        <td><h3>focus time today</h3><br>
          <div style="border: 15px pink solid; height: 140px;width:140px;border-radius:70px;margin:auto;"></div>
          <!--just here for Mockup purposes-->
          <br></td>
      </tr>

    </tbody>
  </table>
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