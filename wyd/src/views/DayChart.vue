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
    import {addDocs, collection, getDoc, doc, firestoreAction, setDoc, updateDoc} from 'firebase/firestore';
    import { db } from '../main';
    import { getAuth, signOut } from '@firebase/auth';

    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
    
    const barLabels = [ 'Food', 'Transport', 'Finance', 'Entertainment', 'Others' ]
    const backgroundColor = ["#FF0D0D", "#C82538", "#B25F4A", "#45731E", "#3BCA6D"] 

    export default {
        created(){
            console.log("=====getting UID=====")
            this.uid = getAuth().currentUser.uid
            console.log(this.uid)

            console.log("=====extracting data from db=====")
            this.checkdb()
        },

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
            },

            uid: "",

            jamesmadethis: {allowance: 1000, cat:{transport: 0, food: 0, entertainment: 0, finance: 0, others: 0}},
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
                
                // console.log(keys)
                // console.log(vals)
                
                var keys = this.chartdata.map(i => {
                    for (let [key, value] of Object.entries(i))
                    return key
                })
                var vals = this.chartdata.map(i => {
                    for (let [key, value] of Object.entries(i))
                    return value
                })
                
                // var propertyValues = await this.getLabels(this.chartdata)
                // this.chartData.labels = propertyValues
                
                var propertyValues = Object.values(this.chartData.labels)
                // this.chartData.labels = keys
                // var propertyValues = this.chartData.labels
                propertyValues = keys
                console.log(propertyValues)
                console.log(this.chartData.labels)
                // this.chartData.datasets[0].data = vals
                var addData = Object.values(this.chartData.datasets[0].data)
                addData = vals
                console.log(addData)
                // addData = await this.getAmt(this.chartdata)
                // console.log(addData)
                console.log(this.chartData.labels)
                console.log(this.chartData.datasets[0].data)
                
                this.loaded = true
            } catch (err) {
                console.error(err)
            }
        },

        methods: {
            async checkdb(){
                const docRef = doc(db, "spendings", this.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data())
                    this.jamesmadethis.allowance = docSnap.data().total
                    let daily = docSnap.data().daily
                    for (var day in daily){
                        if (Object.keys(daily[day].cat).length !== 0){
                            console.log("day is:" + day)
                            for (var oneCat in daily[day].cat){
                                this.jamesmadethis.cat[oneCat] += daily[day].cat[oneCat]
                            }
                        }
                    }
                    console.log(this.jamesmadethis)


                } 
                // else {
                //     // doc.data() will be undefined in this case
                //     console.log("No such document!");
                //     setDoc(docRef, {total: 1000, lastSpending: 0, daily: {1:{amt: 0, cat: {}},2:{amt: 0, cat: {}},3:{amt: 0, cat: {}},4:{amt: 0, cat: {}},5:{amt: 0, cat: {}},6:{amt: 0, cat: {}},7:{amt: 0, cat: {}},8:{amt: 0, cat: {}},9:{amt: 0, cat: {}},10:{amt: 0, cat: {}},11:{amt: 0, cat: {}},12:{amt: 0, cat: {}},13:{amt: 0, cat: {}},14:{amt: 0, cat: {}},15:{amt: 0, cat: {}},16:{amt: 0, cat: {}},17:{amt: 0, cat: {}},18:{amt: 0, cat: {}},19:{amt: 0, cat: {}},20:{amt: 0, cat: {}},21:{amt: 0, cat: {}},22:{amt: 0, cat: {}},23:{amt: 0, cat: {}},24:{amt: 0, cat: {}},25:{amt: 0, cat: {}},26:{amt: 0, cat: {}},27:{amt: 0, cat: {}},28:{amt: 0, cat: {}},29:{amt: 0, cat: {}},30:{amt: 0, cat: {}},31:{amt: 0, cat: {}}} } );
                // }
            },



            getLabels(a) {
                var keys = a.map(i => {
                    Object.keys(i)
                })
                return keys
            },
            getAmt(a) {
                var vals = a.map(i => {
                    Object.values(i)
                })
                return vals
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