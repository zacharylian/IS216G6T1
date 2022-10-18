<template>

    <div class="container-fluid base-bg">
        <div class="row">
            <box-container :columnLength="3">
                <div id="day-chart">
                    <day-chart :chartData="chartData" :options="chartOptions"></day-chart>
                </div>
            </box-container>
        </div>
    </div>

</template>


<script>
    import { reactive, toRefs } from '@vue/reactivity';
    import DayChart from './DayChart.vue';
    
    export default {
        setup() {
            const state = reactive({
                chartOptions: {
                    hoverBorderWidth: 20,
                    responsive: true,
                    maintainAspectRatio: false
                },
                chartData: {
                    hoverBackgroundColor: 'red',
                    hoverBorderWidth: 10,
                    labels: ['Green', 'Red', 'Blue'],
                    datasets: [
                        {
                            label: 'Data One',
                            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
                            data: [1, 10, 5]
                        }
                    ]
                }
            });
    
            return { ...toRefs(state) };
        },
    
        components: {
            'day-chart': DayChart
            
        },
    
        name: 'SpendingDashBoard'
    };
    </script>
    