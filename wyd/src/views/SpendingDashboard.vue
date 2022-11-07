<template>
  <div>
    <navigation-bar></navigation-bar>
    <div class="border border-info" style="height: 95%">
      <div class="row border border-primary h-50">
        <div class="col border border-danger w-50">
            <h2><u>Overall Spendings</u></h2>
            <DayChart></DayChart>
        </div>
        <div class="col border border-success w-50">
            <h2><u>Today's Spendings</u></h2>
            <TodaySpending />
        </div>
      </div>
      <div class="row border border-warning h-50">
        <div class="col border border-primary">
            <h2><u>Monthly Spendings</u></h2>
        </div>
        <div id="d3sucks">
            <CalendarHeatmap />
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
// IMPORTS
import navBar from "@/components/layouts/navbar.vue";

import DayChart from "./DayChart.vue";
import CalendarHeatmap from "./ActualCalendarHeatmap.vue";
import "../plugins/calendar";
import TodaySpending from "./TodaySpending.vue";

//EXPORTS
export default {
  name: "SpendingDashboard",
  components: {
    "navigation-bar": navBar,
    DayChart: DayChart,
    CalendarHeatmap: CalendarHeatmap,
    TodaySpending: TodaySpending,
  },
};
</script>

<style></style>

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
