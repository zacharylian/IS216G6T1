<template>
  <!-- <svg class="chart"></svg> -->
  <calendar-heatmap
    style="font-size:10px; width:90%;"
    :values="[
      { date: '2022-06-22', count: 78 }, 
      { date: '2022-06-23', count: 250},
      { date: '2022-06-24', count: 500 }]"
    end-date="2023-01-01"
    :range-color="['#90EF90', '#77945C', '#ebedf0', '#B13433', '#ED2938']"
    :no-data-text="'<b>You did not spend for today!</b>'"
    :tooltip-unit="'SGD Total'"
  ></calendar-heatmap>
</template>

<script>
import { CalendarHeatmap } from 'vue3-calendar-heatmap'

export default {
    components: {
        CalendarHeatmap
    },
    props: {
      values: []
    },
    data() {
      return {
        
      }
    }
    
}

// export default {
//   name: "calendarHeatmap",
//   components: {
//     "calendarHeatmap": CalendarHeatmap
//   },
//   mounted() {

//     const d3Script = document.createElement("script");
//     d3Script.setAttribute("src", "https://d3js.org/d3.v7.min.js");
//     d3Script.setAttribute("charset", "utf-8")
//     document.head.appendChild(d3Script);

    

//     CalendarJs()
    
//     },
//   };
</script>

<style>
.rect {
  fill: cornflowerblue;
}

.rect:hover {
  fill: black;
}

.axis path,
.axis line {
  fill: none;
  stroke: #fff;
}

.axis-label {
  font-weight: bold;
}

.d3-tip {
  line-height: 1;
  font-weight: bold;
  padding: 20px;
  background: #7289DA;
  color: #000;
  border-radius: 5px;
}
</style>
