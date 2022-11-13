import * as d3 from "d3";

export default () => {
  console.log("HELLO!!!");
  // fetch(
  //   "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json"
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
      const sudoData = {
        "allowance": 1000, 
        "oct": [
            {"date": 1, "day": "mon", "week": 1 ,"amt": 24, "cat": "finance"},
            {"date": 2, "day": "tue", "week": 1 ,"amt": 25, "cat": "finance"},
            {"date": 3, "day": "wed", "week": 1 ,"amt": 30, "cat": "transport"},
            {"date": 4, "day": "thu", "week": 1 ,"amt": 5, "cat": "food"},
            {"date": 5, "day": "fri", "week": 1 ,"amt": 30, "cat": "food"},
            {"date": 6, "day": "sat", "week": 1 ,"amt": 123, "cat": "investment"},
            {"date": 7, "day": "sun", "week": 1 ,"amt": 45, "cat": "finance"},
            {"date": 8, "day": "mon", "week": 2 ,"amt": 123, "cat": "investment"},
            {"date": 9, "day": "tue", "week": 2 ,"amt": 78, "cat": "finance"},
            {"date": 10, "day": "wed", "week": 2 ,"amt": 10, "cat": "finance"},
            {"date": 11, "day": "thu", "week": 2 ,"amt": 234, "cat": "investment"},
            {"date": 12, "day": "fri", "week": 2 ,"amt": 44, "cat": "finance"},
            {"date": 13, "day": "sat", "week": 2 ,"amt": 33, "cat": "food"},
            {"date": 14, "day": "sun", "week": 2 ,"amt": 22, "cat": "transport"},
            {"date": 15, "day": "mon", "week": 3 ,"amt": 25, "cat": "finance"},
            {"date": 16, "day": "tue", "week": 3 ,"amt": 455, "cat": "investment"},
            {"date": 17, "day": "wed", "week": 3 ,"amt": 46, "cat": "transport"},
            {"date": 18, "day": "thu", "week": 3 ,"amt": 67, "cat": "transport"},
            {"date": 19, "day": "fri", "week": 3 ,"amt": 78, "cat": "finance"},
            {"date": 20, "day": "sat", "week": 3 ,"amt": 89, "cat": "finance"},
            {"date": 21, "day": "sun", "week": 3 ,"amt": 90, "cat": "finance"},
            {"date": 22, "day": "mon", "week": 4 ,"amt": 95,  "cat": "finance"},
            {"date": 23, "day": "tue", "week": 4 ,"amt": 124, "cat": "investment"},
            {"date": 24, "day": "wed", "week": 4 ,"amt": 123, "cat": "investment"},
            {"date": 25, "day": "thu", "week": 4 ,"amt": 122, "cat": "investment"},
            {"date": 26, "day": "fri", "week": 4 ,"amt": 10, "cat": "food"},
            {"date": 27, "day": "sat", "week": 4 ,"amt": 89, "cat": "finance"},
            {"date": 28, "day": "sun", "week": 4 ,"amt": 90, "cat": "finance"},
            {"date": 29, "day": "mon", "week": 5 ,"amt": 10, "cat": "food"},
            {"date": 30, "day": "tue", "week": 5 ,"amt": 123,  "cat": "investment"},
            {"date": 31, "day": "wed", "week": 5 ,"amt": 232,  "cat": "investment"},
          ],
      }

      function colorAssignment(d) {
        if (d >= 500) {
          return "FF0D0D"
        } else if (d >= 400) {
          return "ED2938"
        } else if (d >= 350) {
          return "C82538"
        } else if (d >= 300) {
          return "B13433"
        } else if (d >= 250) {
          return "B25F4A"
        } else if (d >= 200) {
          return "675E24"
        } else if (d >= 150) {
          return "45731E"
        } else if (d >= 100) {
          return "77945C"
        } else if (d >= 50) {
          return "3BCA6D"
        } else {
          return "90EF90"
        }
      }
      // var gotData = data.monthlyVariance; //data
      // var amtArr = []
      // var catArr = []
      // console.log(sudoData.months)
    
      // for (let [month, details] of Object.entries(sudoData)) {
      //   console.log(month)
      //   console.log(details)
      //   for (let day of details) {
      //           // console.log(day)
      //           let price = day.amt;
      //           let category = day.cat;
      //           amtArr.push(price);
      //           catArr.push(category);
      //   }
      // }
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

      // var months = [
      //   "Jan",
      //   "Feb",
      //   "Mar",
      //   "Apr",
      //   "May",
      //   "Jun",
      //   "Jul",
      //   "Aug",
      //   "Sept",
      //   "Oct",
      //   "Nov",
      //   "Dec",
      // ];
      var days = [
        "Monday",
        "Tuesday", 
        "Wednesday",
        "Thursday", 
        "Friday", 
        "Saturday", 
        "Sunday"
      ]

      var weeks = [
        "week1",
        "week2",
        "week3",
        "week4",
        "week5"
      ]
      console.log(sudoData.oct)
      // var minYear = 2010;
      var dayStart = 0;
      // var maxYear = gotData[gotData.length - 1].year;
      // var maxYear = 2015;
      var dayEnd = 8;
      // var minVar = d3.min(gotData, function (d) {
      //   return d.variance;
      // });
      // var maxVar = d3.max(gotData, function (d) {
      //   return d.variance;
      // });
      // var yearFormat = d3.format("04d");
      // var barWidth = Math.ceil(width / gotData.length) + 3;
      var barWidth = 20;
      var barHeight = 20;
      // var baseVariance = data.baseTemperature; //8.66 -> change to spendings
      // var baseSpendings = 0;

      // Set the x axis to years
      // var x = d3.scale.linear().domain([minYear, maxYear]).range([0, width]);
      var x = d3.scaleLinear().domain([dayStart, dayEnd]).range([0, width]);

      // Set the y axis to months
      var y = d3.scaleLinear().domain([0, 6]).range([0, height]);

      // Set the z axis to colors
      // var z = d3.scale.quantile().domain([0, 501]).range(colors);

      // Tooltips
      // var tip = d3
      //   .tip()
      //   .attr("class", "d3-tip")
      //   .offset([-10, 0])
      //   .html(function (d) {
      //     return (
      //       weeks[d.week - 1] +
      //       " " +
      //       d.date +
      //       "<br/>Spendings: " +
      //       d.amt
      //     );
      //   });

      
      // Set up the chart space
      var svg = d3
        .select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        // .style("background-color", "blue");
      
      
      console.log(sudoData.oct)
      // Draw data rectangles
      const octo = sudoData.oct
      var flatMat = octo.map(i => {
        return i.amt
      })
      console.log(flatMat)
      var count = 0
      octo.forEach((day, i) => {
        // console.log(day)
        svg.append('rect')
          .selectAll(".rect")
          .data(flatMat)
          // .join("rect")
          // .attr("x", (d) => x(d.date) + margin.left)
          .attr("x", x(i % 7) + margin.left)
          // .attr("y", (d) => y(d.week) * (barHeight) + margin.top)
          .attr("y", y(Math.floor(i / 7)) * (barHeight) + margin.top)
          .attr("width", barWidth)
          .attr("height", barHeight)
          .attr("fill", (d) => colorAssignment(d))
        console.log(count++)
      })
      // var rect = svg
      //   .selectAll(".rect")
      //   // .data(gotData)
      //   .data(sudoData.oct.amt) //
      //   .enter()
      //   .append("rect")
      //   .attr("fill", function (d) {
      //     // return z(d.variance);
      //     // for (let [month, details] of Object.entries(d)) {
      //     //   for (let item of details) {
      //     //     console.log(item)
      //     //     return z(item.amt)
      //     //   }
      //     // }
      //     return colorAssignment(d);
      //   })
      //   .attr("x", function (d) {
      //     // return x(d.year);
      //     // return x(d.amt)
      //     // for (let [month, details] of Object.entries(d)) {
      //     //   for (let item of details) {
      //     //     return x(item.date)
      //     //   }
      //     // }
      //     for (let i in days) {
      //       let edited = days[i].slice(0, 3).toLowerCase()
      //       if (d.day == edited) {
      //         return x(i+1)
      //       }
      //     }
      //     // return x(d.day);
      //   })
      //   .attr("y", function (d) {
      //     // return y(d.month);
      //     // return y(d.category)
      //     // for (let [month, details] of Object.entries(d)) {
      //     //   for (let item of details) {
      //     //     return y(item.week)
      //     //   }
      //     // }
          
      //     return y(d.week);
      //   })
      //   .attr("width", barWidth)
      //   .attr("height", barHeight);
      // //   .on("mouseover", tip.show)
      // //   .on("mouseout", tip.hide);

      
      // svg.call(tip);

      // // xAxis SVG function
      // var xAxis = d3.svg
      // .axis()
      // .scale(x)
      // .orient("bottom")
      // .tickFormat((d, i) => days[i])
      // .ticks((dayEnd - dayStart) / 7)
      // .tickValues([0, 0.17, 0.33, 0.5, 0.67, 0.83, 1]);
      // .ticks(7)

      // // Draw axis
      // var xAxisGroup = svg
      //   .append("g")
      //   .attr("class", "axis")
      //   .attr("transform", "translate(0," + height + ")")
      //   .call(xAxis);

      var xAxisGroup = svg
        .append("g")
        .selectAll("text")
        .data(days)
        .join("text")
        .text(function (d) {
          return d.slice(0, 3);
        })
        .attr("x", (d, i) => x(i) + margin.left)
        .attr("y", height - margin.bottom)

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
          return i * (height / 7);
        })
        .style("text-anchor", "end")
        // .attr("transform", "translate(0 ,15)") //update yaxis here
        .attr("transform", "translate(" + 0 + "," + height/4 + ")")
        .attr("class", "month-label");

      // // Draw legend
      // var legend = svg
      //   .selectAll(".legend")
      //   .data([0].concat(z.quantiles()), function (d) {
      //     return d;
      //   })
      //   .enter()
      //   .append("g")
      //   .attr("class", "legend")
      //   .attr("transform", function (d, i) {
      //     return "translate(" + (width + 20) + "," + (20 + i * 20) + ")";
      //   });

      // legend
      //   .append("rect")
      //   .attr("width", 20)
      //   .attr("height", 20)
      //   .style("fill", z);

      // legend
      //   .append("text")
      //   .text(function (d, i) {
      //     return d.toFixed(0);
      //   })
      //   .attr("x", 30)
      //   .attr("y", 15);

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
        .attr("transform", "translate(" + width / 2 + "," + (height) + ")")
        .append("text")
        .attr("text-anchor", "middle")
        .attr("class", "axis-label")
        .text("Days");
  }
//     });
// };
