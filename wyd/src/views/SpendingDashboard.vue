<template>
<navbar style="z-index:5"></navbar>
  <body>
    <div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
    </div>
  </body>
  <div style="margin-left:6rem; overflow:hidden">
    <!-- <div class="border border-info" style="height: 95%"> -->
      <div class="row p-4 mx-auto">
        <div class="col-lg-12 col-md-6 text-center bgbox mx-auto" style="width:40%;border-radius:20px">
            <br>
            <h2><b><u>Overall Spendings</u></b></h2>
            <h4>{{ this.days[this.date.getUTCDate()] }}</h4>
            <br>
            <DayChart></DayChart>
        </div>
        <div class="col-lg-12 col-md-6 text-center bgbox mx-auto" style="margin-left:20px;margin-right:-20px; width:40%;border-radius:20px">
            <br>
            <h2><b><u>Today's Spendings</u></b></h2>
            <br>
            <TodaySpending />
            <br>
        </div>
      </div>
      
      <div class="row border border-primary">
        <div class="col bgbox text-center border border-warning" style="border-radius:20px; width:400px">
            <br>
            <h2><b><u>Monthly Spendings</u></b></h2>
            <br>
            <CalendarHeatmap />
        </div> 
      </div>
      <br>
      
    </div>
  <!-- </div> -->
</template>

<script>
// IMPORTS
import navbar from '@/components/layouts/new_navbar.vue';
import { getAuth, signOut } from '@firebase/auth';
import DayChart from "./DayChart.vue";
import calendarHeatmap from "./ActualCalendarHeatmap.vue";
import "../plugins/calendar";
import TodaySpending from "./TodaySpending.vue";


//EXPORTS
export default {
  name: "SpendingDashboard",
  components: {
    navbar: navbar,
    DayChart: DayChart,
    CalendarHeatmap: calendarHeatmap,
    TodaySpending: TodaySpending,
  },
  data() {
    return {
        date: new Date(),
        days: [ 
        "Monday",
        "Tuesday", 
        "Wednesday",
        "Thursday", 
        "Friday", 
        "Saturday", 
        "Sunday"
        ],
    }
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
        getDay() {
            var day = ""
            var idxDay = this.date.getUTCDate()
            day = this.days[idxDay]
            console.log(day)
            return day
        },
  }
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
