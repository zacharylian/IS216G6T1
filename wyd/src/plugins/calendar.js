export default () => {
  console.log("HELLO!!!");
  fetch(
    "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json"
  )
    .then((response) => response.json())
    .then((data) => {
      var gotData = data.monthlyVariance;
      var itemSize = 18;
      var cellSize = itemSize - 1;
      var margin = { top: 30, right: 100, bottom: 40, left: 90 };
      var width = 960 - margin.left - margin.right;
      var height = 480 - margin.top - margin.bottom;
      var colors = [
        "#15f4c1",
        "#12dbad",
        "#10c39a",
        "#0eaa87",
        "#0c9273",
        "#0a7a60",
        "#08614d",
        "#064939",
        "#043026",
        "#021813",
        "#000000",
      ];

      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];

      var minYear = gotData[0].year;
      var maxYear = gotData[gotData.length - 1].year;
      var minVar = d3.min(gotData, function (d) {
        return d.variance;
      });
      var maxVar = d3.max(gotData, function (d) {
        return d.variance;
      });
      var yearFormat = d3.format("04d");
      var barWidth = Math.ceil(width / gotData.length) + 3;
      var baseVariance = data.baseTemperature;

      // Set the x axis to years
      var x = d3.scale.linear().domain([minYear, maxYear]).range([0, width]);

      // Set the y axis to months
      var y = d3.scale.linear().domain([1, 13]).range([0, height]);

      // Set the z axis to colors
      var z = d3.scale.quantile().domain([minVar, maxVar]).range(colors);

      // xAxis SVG function
      var xAxis = d3.svg
        .axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(yearFormat)
        .ticks((maxYear - minYear) / 10);

      // Tooltips
      var tip = d3
        .tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function (d) {
          return (
            months[d.month - 1] +
            " " +
            d.year +
            "<br/>Temp: " +
            (baseVariance + d.variance).toFixed(2)
          );
        });

      // Set up the chart space
      var svg = d3
        .select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Draw data rectangles
      var rect = svg
        .selectAll(".rect")
        .data(gotData)
        .enter()
        .append("rect")
        .attr("fill", function (d) {
          return z(d.variance);
        })
        .attr("x", function (d) {
          return x(d.year);
        })
        .attr("y", function (d) {
          return y(d.month);
        })
        .attr("width", barWidth)
        .attr("height", height / 12)
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

      svg.call(tip);

      // Draw axis
      var xAxisGroup = svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

      // Draw month labels
      var monthLabels = svg
        .selectAll(".month-label")
        .data(months)
        .enter()
        .append("text")
        .text(function (d) {
          return d;
        })
        .attr("x", 0)
        .attr("y", function (d, i) {
          return i * (height / 12);
        })
        .style("text-anchor", "end")
        .attr("transform", "translate(-10,25)")
        .attr("class", "month-label");

      // Draw legend
      var legend = svg
        .selectAll(".legend")
        .data([0].concat(z.quantiles()), function (d) {
          return d;
        })
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
          return "translate(" + (width + 20) + "," + (20 + i * 20) + ")";
        });

      legend
        .append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", z);

      legend
        .append("text")
        .text(function (d, i) {
          return d.toFixed(2);
        })
        .attr("x", 30)
        .attr("y", 15);

      // Draw axis labels
      svg
        .append("g")
        .attr("transform", "translate(" + -50 + "," + height / 2 + ")")
        .append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("class", "axis-label")
        .text("Month");

      svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height + 40) + ")")
        .append("text")
        .attr("text-anchor", "middle")
        .attr("class", "axis-label")
        .text("Year");
    });
};
