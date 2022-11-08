<template>
    <div class="card shadow-4 rounded-5 mx-auto my-auto ho">
        <Bar
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
    </div>
</template>
  
<script>
    import { Bar } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
    
    const barLabels = [ 'Week1', 'Week2', 'Week3', 'Week4', 'Week5' ]
    const backgroundColor = ["#FF0D0D", "#C82538", "#B25F4A", "#45731E", "#3BCA6D"] 


    export default {
        name: 'BarChart',
        components: { Bar },
        props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 150
        },
        height: {
            type: Number,
            default: 150
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => {}
        },
        plugins: {
            type: Object,
            default: () => {}
        }
        },
        data() {
        return {
            
            chartData: {
            labels: barLabels,
            datasets: [ { 
                label: barLabels,
                data: [500, 350, 225, 110, 78],
                backgroundColor: backgroundColor
            } ]
            },
            chartOptions: {
                responsive: true,
                legend: {
                display: true,
                labels: {
                    generateLabels() {
                    return barLabels.map((label, index) => ({
                        text: label,
                        fillStyle: backgroundColor[index]
                    }))
                    }
                    }   
                }
            }
        }
    }}
</script>

<!-- <template>
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
                default: 50,
            },
            height: {
                type: Number,
                default: 50,
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
    </script> -->