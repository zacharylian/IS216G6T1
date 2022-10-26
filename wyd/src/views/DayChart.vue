<template>
    <navigation-bar></navigation-bar>
</template>

<script>
    import navBar from '@/components/layouts/navbar.vue';
    import { h } from 'vue';
    
    
    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

    const data = {
  labels: [
    'Red',
    'Blue',
    'Yellow'
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [300, 50, 100],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
};

const config = {
  type: 'Doughnut',
  data: data,
};
    
    export default {
        name: 'DayChart',
        components: {
            Doughnut
        },
        props: {
            chartId: {
                type: String,
                default: 'doughnut-chart'
            },
            width: {
                type: Number,
                default: 100
            },
            height: {
                type: Number,
                default: 100
            },
            cssClasses: {
                default: '',
                type: String
            },
            styles: {
                default: {}
            },
            plugins: {
                default: []
            },
            chartData: {
                type: Object,
                default: () => ({
                    labels: [],
                    datasets: []
                })
            },
            chartOptions: {
                type: Object,
                default: () => ({
                    labels: [],
                    datasets: []
                })
            }
        },
    
        setup(props) {
            return () =>
                h(Doughnut, {
                    chartData: props.chartData,
                    chartOptions: props.chartOptions,
                    chartId: props.chartId,
                    width: props.width,
                    height: props.height,
                    cssClasses: props.cssClasses,
                    styles: props.styles,
                    plugins: props.plugins
                });
        }
        

    };
    </script>
    