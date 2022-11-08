export default () => {
  console.log("HELLO!!!");
  fetch(
    "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const sudoData = {
        months: 
          {"oct": [
            {"amt": 24, "cat": "finance"},
            {"amt": 25, "cat": "finance"},
            {"amt": 30, "cat": "transport"},
            {"amt": 5, "cat": "food"},
            {"amt": 30, "cat": "food"},
            {"amt": 123, "cat": "investment"},
            {"amt": 45, "cat": "finance"},
            {"amt": 123, "cat": "investment"},
            {"amt": 78, "cat": "finance"},
            {"amt": 10, "cat": "finance"},
            {"amt": 234, "cat": "investment"},
            {"amt": 44, "cat": "finance"},
            {"amt": 33, "cat": "food"},
            {"amt": 22, "cat": "transport"},
            {"amt": 25, "cat": "finance"},
            {"amt": 455, "cat": "investment"},
            {"amt": 46, "cat": "transport"},
            {"amt": 67, "cat": "transport"},
            {"amt": 78, "cat": "finance"},
            {"amt": 89, "cat": "finance"},
            {"amt": 90, "cat": "finance"},
            {"amt": 95,  "cat": "finance"},
            {"amt": 124, "cat": "investment"},
            {"amt": 123, "cat": "investment"},
            {"amt": 122, "cat": "investment"},
            {"amt": 10, "cat": "food"},
            {"amt": 89, "cat": "finance"},
            {"amt": 90, "cat": "finance"},
            {"amt": 10, "cat": "food"},
            {"amt": 123,  "cat": "investment"},
            {"amt": 232,  "cat": "investment"},
          ],
          "nov": [
            {"amt": 24, "cat": "finance"},
            {"amt": 25, "cat": "finance"},
            {"amt": 30, "cat": "transport"},
            {"amt": 5, "cat": "food"},
            {"amt": 30, "cat": "food"},
            {"amt": 123, "cat": "investment"},
            {"amt": 45, "cat": "finance"},
            {"amt": 123, "cat": "investment"},
            {"amt": 78, "cat": "finance"},
            {"amt": 10, "cat": "finance"},
            {"amt": 234, "cat": "investment"},
            {"amt": 44, "cat": "finance"},
            {"amt": 33, "cat": "food"},
            {"amt": 22, "cat": "transport"},
            {"amt": 25, "cat": "finance"},
            {"amt": 455, "cat": "investment"},
            {"amt": 46, "cat": "transport"},
            {"amt": 67, "cat": "transport"},
            {"amt": 78, "cat": "finance"},
            {"amt": 89, "cat": "finance"},
            {"amt": 90, "cat": "finance"},
            {"amt": 95,  "cat": "finance"},
            {"amt": 124, "cat": "investment"},
            {"amt": 123, "cat": "investment"},
            {"amt": 122, "cat": "investment"},
            {"amt": 10, "cat": "food"},
            {"amt": 89, "cat": "finance"},
            {"amt": 90, "cat": "finance"},
            {"amt": 10, "cat": "food"},
            {"amt": 123,  "cat": "investment"}
          ]},
      }
      var gotData = data.monthlyVariance; //data
      var amtArr = []
      var catArr = []
      console.log(sudoData.months)
      
      for (let [month, details] of Object.entries(sudoData.months)) {
        console.log(month)
        console.log(details)
        for (let day of details) {
          // console.log(day)
          let price = day.amt;
          let category = day.cat;
          amtArr.push(price);
          catArr.push(category);
        }
      }
      // var tryData = sudoData.months[0]
      // console.log(tryData)
      var itemSize = 18;
      var cellSize = itemSize - 1;
      var margin = { top: 30, right: 100, bottom: 40, left: 90 };
      var width = 780 - margin.left - margin.right;
      var height = 480 - margin.top - margin.bottom;
      var colors = [
        "#00FF7F",
        "#90EF90",
        "#3BCA6D",
        "#77945C",
        "#45731E",
        "#675E24",
        "#B25F4A",
        "#B13433",
        "#C82538",
        "#ED2938",
        "#FF0D0D",
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

      var weeks = [
        "week1",
        "week2",
        "week3",
        "week4",
        "week5"
      ]

      var minYear = 2010;
      var dayStart = 0;
      // var maxYear = gotData[gotData.length - 1].year;
      var maxYear = 2015;
      var dayEnd = 8;
      // var minVar = d3.min(gotData, function (d) {
      //   return d.variance;
      // });
      // var maxVar = d3.max(gotData, function (d) {
      //   return d.variance;
      // });
      var yearFormat = d3.format("04d");
      // var barWidth = Math.ceil(width / gotData.length) + 3;
      var barWidth = 20;
      var barHeight = 20;
      // var baseVariance = data.baseTemperature; //8.66 -> change to spendings
      var baseSpendings = 0;

      // Set the x axis to years
      // var x = d3.scale.linear().domain([minYear, maxYear]).range([0, width]);
      var x = d3.scale.linear().domain([dayStart, dayEnd]).range([0, width]);

      // Set the y axis to months
      var y = d3.scale.linear().domain([1, 6]).range([0, height]);

      // Set the z axis to colors
      var z = d3.scale.quantile().domain([0, 501]).range(colors);

      // xAxis SVG function
      var xAxis = d3.svg
        .axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(yearFormat)
        .ticks((dayEnd - dayStart) / 10);

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
            "<br/>Spendings: " +
            (baseSpendings + d.variance).toFixed(2)
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
        // .data(gotData)
        .data(sudoData.months) //
        .enter()
        .append("rect")
        .attr("fill", function (d) {
          // return z(d.variance);
          console.log(d)
          for (let [month, details] of Object.entries(d)) {
            for (let day of details) {
              console.log(day)
              return z(day.amt)
            }
          }
          // return z(d.amt)
        })
        .attr("x", function (d) {
          // return x(d.year);
          // return x(d.amt)
          for (let [month, details] of Object.entries(d)) {
            for (let day of details) {
              return x(day.amt)
            }
          }
        })
        .attr("y", function (d) {
          // return y(d.month);
          // return y(d.category)
          for (let [month, details] of Object.entries(d)) {
            for (let day of details) {
              return x(day.category)
            }
          }
        })
        .attr("width", barWidth)
        .attr("height", barHeight)
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
        .data(weeks)
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
        .attr("transform", "translate(-35,15)") //update yaxis here
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
          return d.toFixed(0);
        })
        .attr("x", 30)
        .attr("y", 15);

      // Draw axis labels
      svg
        .append("g")
        .attr("transform", "translate(" + -65 + "," + height / 2 + ")")
        .append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("class", "axis-label")
        .text("Week");

      svg
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + (height + 40) + ")")
        .append("text")
        .attr("text-anchor", "middle")
        .attr("class", "axis-label")
        .text("Days");
    });
};
