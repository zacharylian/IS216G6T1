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
    import { ProgressBar } from 'progressbar.js'
    
// progressbar.js@1.0.0 version is used
// Docs: http://progressbarjs.readthedocs.org/en/1.0.0/

var bar = new ProgressBar.Circle(container, {

  // Set default step function for all animate calls

});

    export default {
        name: 'progressbar',
        components: { 'progressbar':progressbar },
        props: {

            color: '#aaa',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 4,
            trailWidth: 1,
            easing: 'easeInOut',
            duration: 1400,
            text: {
                autoStyleContainer: false
            },
            from: { color: '#aaa', width: 1 },
            to: { color: '#333', width: 4 },

        },

        methods: {
            step(state,circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);

                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                circle.setText('');
                } else {
                circle.setText(value);
                }
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