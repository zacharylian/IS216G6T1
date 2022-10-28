<template>
    <Doughnut
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </template>

<script>
    import { defineComponent, h } from 'vue';
    
    import { Doughnut } from 'vue-chartjs';
    
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
    
    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);
    
    export default defineComponent({
        name: 'DayChart',
        components: {
            Doughnut
        },
        props: {
            chartId: {
                type: String,
                default: 'doughnut-chart'
            },
            datasetIdKey: {
                type: String,
                default: 'label'
            },
            width: {
                type: Number,
                default: 400,
            },
            height: {
                type: Number,
                default: 400,
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
                    // labels: ["numbers"],
                    // datasets: [[12, 19, 3, 5, 2, 3]]
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: '# of Votes',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ]
                            }]
            }),
            // chartOptions: {
            //     type: Object,
            //     default: () => ({
            //         labels: [],
            //         datasets: [12, 19, 3, 5, 2, 3]
            //     })
            }
        },
//   computed: {
//     myStyles () {
//       return {
//         height: '50%',
//         position: 'relative'
//       }
//     },
    
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
        

    });
    </script>