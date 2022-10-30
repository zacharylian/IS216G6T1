<template>
    <navigation-bar></navigation-bar>
    <div class="border border-info" style="height:95%">
        <div class="row border border-primary h-50">
            <div class="col border border-danger w-50" >
                <DayChart></DayChart>
            </div>
            <div class="col border border-success w-50">
                today
            </div>
        </div>
        <div class="row border border-warning h-50">
            <div class="col border border-primary">
                zach put ur d3 here
            </div>
        </div>
    </div>

</template>

<script>

// IMPORTS
import navBar from '@/components/layouts/navbar.vue';

import DayChart from './DayChart.vue'

//EXPORTS
export default {
    name: 'SpendingDashboard',
    components: {
    "navigation-bar": navBar,
    "DayChart": DayChart
    }
}


</script>

<!-- 
<template>
    <navigation-bar></navigation-bar>
<div class="container-fluid base-bg">
        <div class="row">
            <box-container :columnLength="3">
                <div id="day-chart">
                    <day-chart :chartData="chartData" :options="chartOptions" :width="200"></day-chart>
                </div>
            </box-container>
        </div>
    </div> -->
    <!-- <DayChart /> -->
<!--
</template>-->
        <!-- <div class="row">
            <box-container :columnLength="3">
                <div id="calendar-heatmap">
                    <calendar-heatmap></calendar-heatmap>
                </div>
            </box-container>
        </div>
    </div> -->
<!-- 
</template> -->


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