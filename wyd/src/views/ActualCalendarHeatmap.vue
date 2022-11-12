<template>
  <svg class="chart"></svg>
</template>

<script>
import CalendarJs from  "../plugins/calendar"

export default {
  name: "CalendarHeatmap",
  mounted() {
    const d3Script = document.createElement("script");
    d3Script.setAttribute("src", "https://d3js.org/d3.v7.min.js");
    d3Script.setAttribute("charset", "utf-8")
    document.head.appendChild(d3Script);

    // const d3Script = document.createElement("script");
    // d3Script.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js");
    // d3Script.setAttribute("charset", "utf-8")
    // document.head.appendChild(d3Script);

    // const labratScript = document.createElement("script")
    // labratScript.setAttribute("src", "http://labratrevenge.com/d3-tip/javascripts/d3.tip.v0.6.3.js")
    // document.head.appendChild(labratScript);

    // const d3fix = document.createElement("script");
    // d3fix.setAttribute("src", "http://d3js.org/d3.v3.min.js");
    // d3fix.setAttribute("charset", "utf-8")
    // document.head.appendChild(d3fix);

    CalendarJs()
  },
};
</script>

<style>
.rect {
  fill: cornflowerblue;
}

.rect:hover {
  fill: black;
}

.axis path,
.axis line {
  fill: none;
  stroke: #fff;
}

.axis-label {
  font-weight: bold;
}

.d3-tip {
  line-height: 1;
  font-weight: bold;
  padding: 20px;
  background: #7289DA;
  color: #000;
  border-radius: 5px;
}
</style>
