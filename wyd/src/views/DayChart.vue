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
            v-if="loaded"
        />
    </div>
</template>
  
<script>
    import { Bar } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
    
    const barLabels = [ 'Food', 'Transport', 'Finance', 'Entertainment', 'Others' ]
    const backgroundColor = ["#FF0D0D", "#C82538", "#B25F4A", "#45731E", "#3BCA6D"] 
    const fakeData = {
            'food': 500,
            'transport': 350, 
            'finance': 225, 
            'entertainment': 110, 
            'others': 78
        }

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
        // created: {
        //     calcTotal() {
        //         var totalAmt = 0
        //         for (let ind of this.fakeData) {
        //             totalAmt += ind.amt
        //         }
        //         return totalAmt
        //     }
        // },
        data: () => ({
            loaded: false,
            // chartData: {
            // labels: barLabels,
            // datasets: [ { 
            //     label: "Weekly Spending",
            //     data: [this.fakeData.food, 350, 225, 110, 78],
            //     backgroundColor: backgroundColor
            // } ]
            // },
            chartData: {
                labels: [],
                datasets: [{
                    data: []
                }]
            },
            chartOptions: {
                responsive: true,
                legend: {
                    position: "right"
                }
            }
        }),
        async mounted () {
            this.loaded = false

            try {
                console.log("you got it")
                // const testData = await fetch("/Users/zachary/Documents/GitHub/IS216G6T1/wyd/src/views/testData.json") -- insert API link here
                const testData = {
                    "allowance": 1000,
                    "cat": [
                        {"transport": 500},
                        {"food": 350},
                        {"entertainment": 225},
                        {"finance": 110},
                        {"others": 78},
                    ]
                }
                this.chartdata = testData.cat
                console.log("a")
                console.log(testData)
                console.log("b")
                
                // this.chartData.labels = this.chartdata.map(i => Object.keys(i)); //currently mapping objects - need to change to string 
                // this.chartData.labels 
                let keys = this.chartdata.map(i => {
                    for (let [key, value] of Object.entries(i)) {
                        return key
                    }
                });
                let vals = this.chartdata.map(i => {
                    for (let [key, value] of Object.entries(i)) {
                        return value
                    }
                });
                console.log(keys)
                console.log(vals)
                // this.chartData.labels = keys
                var propertyValues = Object.values(this.chartData.labels)
                propertyValues = keys
                console.log(propertyValues)
                // this.chartData.datasets[0].data = vals
                var addData = Object.values(this.chartData.datasets[0].data)
                addData = vals
                console.log(addData)
                console.log(this.chartData.labels)
                console.log(this.chartData.datasets[0].data)
                
                this.loaded = true
            } catch (err) {
                console.error(err)
            }
        }
    }
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