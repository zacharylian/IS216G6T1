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
    <!-- <div class="border border-info" style="height: 95%"> -->
      <div class="row border border-primary h-50">
        <div class="col border border-danger w-50">
            <br>
            <h2><u>Overall Spendings</u></h2>
            <br>
            <DayChart></DayChart>
        </div>
        <div class="col border border-success w-50">
            <br>
            <h2><u>Today's Spendings</u></h2>
            <br>
            <TodaySpending />
        </div>
      </div>
      
      <div class="row border border-warning h-50">
        <div class="col border border-primary">
            <br>
            <h2><u>Monthly Spendings</u></h2>
            <br>
            <CalendarHeatmap />
        </div>
        
      </div>
      
    </div>
  <!-- </div> -->
</template>

<script>
// IMPORTS
import {open, toggleNavbar, navbarWidth} from '@/components/layouts/state';
import DayChart from "./DayChart.vue";
import CalendarHeatmap from "./ActualCalendarHeatmap.vue";
import "../plugins/calendar";
import TodaySpending from "./TodaySpending.vue";
import navBar from '@/components/layouts/navbar.vue';

//EXPORTS
export default {
  name: "SpendingDashboard",
  components: {
    DayChart: DayChart,
    CalendarHeatmap: CalendarHeatmap,
    TodaySpending: TodaySpending,
    'navigation-bar': navBar,
  },
  setup() {
    return {open, toggleNavbar, navbarWidth}
  },
};
</script>

<style>
    .card {
        width: 50%;
        margin-top: 100px;
        backdrop-filter: blur(1rem);
        box-shadow: 1.3rem 1.3rem 1.3rem rgba(0, 0, 0, 0.5);
        border-top-color: rgba(225, 225, 225, 0.5);
        border-left-color: rgba(225, 225, 225, 0.5);
        border-bottom-color: rgba(225, 225, 225, 0.1);
        border-right-color: rgba(225, 225, 225, 0.1);
    }
    .ho:hover {
        text-shadow: none !important;
        box-sizing: border-box !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
        -webkit-transform: scale(1.01) !important;
        -ms-transform: scale(1.01) !important;
        transform: scale(1.01) !important;
        z-index: 2;
    }
</style>

<!--
<script>
    import navBar from '@/components/layouts/navbar.vue';
    import { reactive, toRefs } from '@vue/reactivity';
    import DayChart from './DayChart.vue';
    //d3.js
    import CalendarHeatmap from './CalendarHeatmap.vue';
    
    export default {

    name: 'SpendingDashboard',
    components: {
      "navigation-bar": navBar,
    //   "DayChart": DayChart
    },
        // },
        // setup() {
        //     const state = reactive({
        //         chartOptions: {
        //             hoverBorderWidth: 20,
        //             responsive: true,
        //             maintainAspectRatio: false
        //         },
        //         chartData: {
        //             hoverBackgroundColor: 'red',
        //             hoverBorderWidth: 10,
        //             labels: ['Green', 'Red', 'Blue'],
        //             datasets: [
        //                 {
        //                     label: 'Data One',
        //                     backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
        //                     data: [1, 10, 5]
        //                 }
        //             ]
        //         }
        //     })
    
        //     return { ...toRefs(state) };
        // },

        // mounted() {
        //     this.addPlugin({
        //         id: 'my-plugin',
        //         beforeDraw: function(chart) {}
        //     })
        //     this.renderChart(this.chartData, this.chartOptions);
        //     },
        // methods: {
        // textCenter(val) {
        //     Chart.pluginService.register({
        //     beforeDraw: function(chart) {
        //         var width = chart.Chart.width;
        //         var height = chart.Chart.height;
        //         var ctx = chart.Chart.ctx;

        //         ctx.restore();
        //         var fontSize = (height / 114).toFixed(2);
        //         ctx.font = fontSize + "em sans-serif";
        //         ctx.textBaseline = "middle";

        //         var text = val;
        //         var textX = Math.round((width - ctx.measureText(text).width) / 2);
        //         var textY = height / 2;

        //         ctx.fillText(text, textX, textY);
        //         ctx.save();
        //     }
        //     });

                Chart.plugins.unregister(this.chartData);
            }
            },
    
        components: {
            'day-chart': DayChart,
            'navigation-bar': navBar,
            'calendar-heatmap': CalendarHeatmap
            
        },
        name: 'SpendingDashBoard'
    };
    </script> -->
-->
