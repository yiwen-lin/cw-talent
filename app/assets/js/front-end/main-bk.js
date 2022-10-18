const lineChartTransformX = 60;
const lineChartTransformY = 40;
let windowWidth = window.innerWidth;
let lineViewBoxSize = {};
function setViewBox() {
  let windowWidth = window.innerWidth;
  lineViewBoxSize = {
    width: 480,
    height: 360,
  };
  if (windowWidth <= 1399) {
    lineViewBoxSize = {
      width: 440,
      height: 320,
    };
  }
  if (windowWidth <= 1199) {
    lineViewBoxSize = {
      width: 700,
      height: 430,
    };
  }
  if (windowWidth <= 991) {
    lineViewBoxSize = {
      width: 500,
      height: 430,
    };
  }
  if (windowWidth <= 767) {
    lineViewBoxSize = {
      width: 480,
      height: 340,
    };
  }
  if (windowWidth <= 575) {
    lineViewBoxSize = {
      width: windowWidth - 20,
      height: (windowWidth - 40) * 0.84,
    };
  }
}
setViewBox();

function initTwVacanciesLineChart() {
  const chartContainer = document.getElementById("tw_vacancies-line_chart");
  const containerClientRect = chartContainer.getBoundingClientRect();
  let windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (containerClientRect.top < windowHeight / 2 && containerClientRect.top > 0) {
    drawChart();
    window.removeEventListener("scroll", initTwVacanciesLineChart);
    window.addEventListener("resize", function() {
      if (windowWidth != window.innerWidth) {
        windowWidth = window.innerWidth
        drawChart();
      }
    });
  }

  function drawChart() {
    var twVacancies = d3.select("#tw_vacancies-line_chart");
    twVacancies.html("");
    var parent = twVacancies.select(function () {
      return this.parentNode;
    });
    var parentWidth = parseInt(parent.style("width"));

    var width = 0.7414448669201521 * parentWidth;
    var height = 0.532319391634981 * parentWidth;

    var data = [
      {
        x: 0,
        y: 444556,
      },
      {
        x: 1,
        y: 457848,
      },
      {
        x: 2,
        y: 537940,
      },
      {
        x: 3,
        y: 496628,
      },
      {
        x: 4,
        y: 515644,
      },
    ];

    twVacancies.attr({
      width: parentWidth,
      height: 0.78 * parentWidth,
      viewBox: `0 0 ${lineViewBoxSize.width} ${lineViewBoxSize.height}`,
    });

    var scaleX = d3.scale.linear().range([0, width]).domain([0, 4]);

    var scaleY = d3.scale.linear().range([height, 0]).domain([0, 600000]);

    var line = d3.svg
      .line()
      .x(function (d) {
        return scaleX(d.x);
      })
      .y(function (d) {
        return scaleY(d.y);
      });

    var axisXTick = {
      0: "2020年上半",
      1: "2020年下半",
      2: "2021年上半",
      3: "2021年下半",
      4: "2022年上半",
    };
    var axisX = d3.svg
      .axis()
      .scale(scaleX)
      .orient("bottom")
      .tickValues([0, 1, 2, 3, 4])
      .tickFormat(function (d) {
        return `${axisXTick[d]}`;
      })
      .tickPadding(10);

    var axisY = d3.svg
      .axis()
      .scale(scaleY)
      .orient("left")
      .tickValues([0, 200000, 400000, 600000])
      .tickFormat(function (d) {
        return d ? d / 10000 + "萬" : d;
      });

    var axisXGrid = d3.svg.axis().scale(scaleX).orient("bottom").ticks(5).tickFormat("").tickSize(-height, 0);

    var axisYGrid = d3.svg.axis().scale(scaleY).orient("left").ticks(3).tickFormat("").tickSize(-width, 0);

    twVacancies
      .append("path")
      .attr({
        d: line(data),
        stroke: "#AE441F",
        "stroke-width": "2.5px",
        fill: "none",
        transform: `translate(${lineChartTransformX}, ${lineChartTransformY})`, //折線圖也要套用 translate
      })
      .style({
        "stroke-dasharray": 1000,
        "stroke-dashoffset": 1000,
        animation: "dash 2s linear forwards",
      });

    // Axis Grid line
    twVacancies
      .append("g")
      .call(axisXGrid)
      .attr({
        fill: "none",
        stroke: "rgba(0,0,0,.1)",
        transform: `translate(${lineChartTransformX},${height + lineChartTransformY})`,
      });

    twVacancies
      .append("g")
      .call(axisYGrid)
      .attr({
        fill: "none",
        stroke: "rgba(0,0,0,.1)",
        transform: `translate(${lineChartTransformX},${lineChartTransformY})`,
      });

    // Axis
    twVacancies
      .append("g")
      .call(axisX)
      .attr({
        fill: "none",
        transform: `translate(${lineChartTransformX},${height + lineChartTransformY})`,
      })
      .selectAll("text")
      .attr({
        fill: "#000",
        stroke: "none",
      })
      .style({
        "font-size": "12px",
      });

    twVacancies
      .append("g")
      .call(axisY)
      .attr({
        fill: "none",
        transform: `translate(${lineChartTransformX}, ${lineChartTransformY})`,
      })
      .selectAll("text")
      .attr({
        fill: "#000",
        stroke: "none",
      })
      .style({
        "font-size": "16px",
      });

    twVacancies
      .append("text")
      .attr({
        class: "x label",
        transform: `translate(${lineChartTransformX}, ${lineChartTransformY})`,
        x: -45,
        y: -20,
      })
      .text("職缺數");

      twVacancies.selectAll("circle.red")
        .data(data)
        .enter()
        .append("circle")
        .attr({
          'fill': '#fff',
          'stroke': '#AE4420',
          'stroke-width': '5',
          'r': 5,
          'cx': function(d) {
            return scaleX(d.x);
          },
          'cy': function(d) {
            return scaleY(d.y);
          },
          'transform': `translate(${lineChartTransformX}, ${lineChartTransformY})`,
        })
        .style({
          'opacity': 0,
          'cursor': 'pointer',
        }).on('mouseover', function(d) {
          const tooltipConfig = {
            value: `${(d.y).toLocaleString('en')}`,
          };
          showChartToolTip(tooltipConfig);
          d3.select(this)
            .transition()
            .duration(100)
            .style({
              'opacity': 1,
            });
        }).on('mouseleave', function() {
          hideChartToolTip();
          d3.select(this)
            .transition()
            .duration(100)
            .style({
              'opacity': 0,
            });
        });
  }
}

function initWorkPeopleLineChart() {
  const chartContainer = document.getElementById("work_people-line_chart");
  const containerClientRect = chartContainer.getBoundingClientRect();
  let windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (containerClientRect.top < windowHeight / 2 && containerClientRect.top > 0) {
    drawChart();
    window.removeEventListener("scroll", initWorkPeopleLineChart);
    window.addEventListener("resize", function() {
      if (windowWidth != window.innerWidth) {
        windowWidth = window.innerWidth
        drawChart();
      }
    });
  }
  function drawChart() {
    var workPeople = d3.select("#work_people-line_chart");
    workPeople.html("");
    var parent = workPeople.select(function () {
      return this.parentNode;
    });
    var parentWidth = parseInt(parent.style("width"));

    var width = 0.7414448669201521 * parentWidth;
    var height = 0.532319391634981 * parentWidth;

    var data = [
      {
        x: 0,
        y: 1681.1,
      },
      {
        x: 1,
        y: 1654.6,
      },
      {
        x: 2,
        y: 1629.9,
      },
    ];

    workPeople.attr({
      width: parentWidth,
      height: 0.76 * parentWidth,
      viewBox: `0 0 ${lineViewBoxSize.width} ${lineViewBoxSize.height}`,
    });

    var scaleX = d3.scale.linear().range([0, width]).domain([0, 2]);

    var scaleY = d3.scale.linear().range([height, 0]).domain([1500, 1750]);

    var line = d3.svg
      .line()
      .x(function (d) {
        return scaleX(d.x);
      })
      .y(function (d) {
        return scaleY(d.y);
      });

    var axisXTick = {
      0: "2020",
      1: "2021",
      2: "2022 年",
    };
    var axisX = d3.svg
      .axis()
      .scale(scaleX)
      .orient("bottom")
      .tickValues([0, 1, 2])
      .tickFormat(function (d) {
        return `${axisXTick[d]}`;
      })
      .tickPadding(10);

    var axisY = d3.svg
      .axis()
      .scale(scaleY)
      .orient("left")
      .tickValues([1500, 1550, 1600, 1650, 1700, 1750])
      .tickFormat(function (d) {
        return d + "萬";
      });

    var axisXGrid = d3.svg.axis().scale(scaleX).orient("bottom").ticks(2).tickFormat("").tickSize(-height, 0);

    var axisYGrid = d3.svg.axis().scale(scaleY).orient("left").ticks(5).tickFormat("").tickSize(-width, 0);

    workPeople
      .append("path")
      .attr({
        d: line(data),
        stroke: "#AE441F",
        "stroke-width": "2.5px",
        fill: "none",
        transform: `translate(${lineChartTransformX}, ${lineChartTransformY})`, //折線圖也要套用 translate
      })
      .style({
        "stroke-dasharray": 1000,
        "stroke-dashoffset": 1000,
        animation: "dash 2s linear forwards",
      });

    // Axis Grid line
    workPeople
      .append("g")
      .call(axisXGrid)
      .attr({
        fill: "none",
        stroke: "rgba(0,0,0,.1)",
        transform: `translate(${lineChartTransformX},${height + lineChartTransformY})`,
      });

    workPeople
      .append("g")
      .call(axisYGrid)
      .attr({
        fill: "none",
        stroke: "rgba(0,0,0,.1)",
        transform: `translate(${lineChartTransformX}, ${lineChartTransformY})`,
      });

    // Axis
    workPeople
      .append("g")
      .call(axisX)
      .attr({
        fill: "none",
        transform: `translate(${lineChartTransformX},${height + lineChartTransformY})`,
      })
      .selectAll("text")
      .attr({
        fill: "#000",
        stroke: "none",
      })
      .style({
        "font-size": "14px",
      });

    workPeople
      .append("g")
      .call(axisY)
      .attr({
        fill: "none",
        transform: `translate(${lineChartTransformX}, ${lineChartTransformY})`,
      })
      .selectAll("text")
      .attr({
        fill: "#000",
        stroke: "none",
      })
      .style({
        "font-size": "14px",
      });

    workPeople
      .append("text")
      .attr({
        class: "x label",
        transform: `translate(${lineChartTransformX}, ${lineChartTransformY})`,
        x: -45,
        y: -20,
      })
      .text("人數");

    workPeople.selectAll("circle.red")
      .data(data)
      .enter()
      .append("circle")
      .attr({
        'fill': '#fff',
        'stroke': '#AE4420',
        'stroke-width': '5',
        'r': 5,
        'cx': function(d) {
          return scaleX(d.x);
        },
        'cy': function(d) {
          return scaleY(d.y);
        },
        'transform': `translate(${lineChartTransformX}, ${lineChartTransformY})`,
      })
      .style({
        'opacity': 0,
        'cursor': 'pointer',
      }).on('mouseover', function(d) {
        const tooltipConfig = {
          value: `${(d.y).toLocaleString('en')}`,
        };
        showChartToolTip(tooltipConfig);
        d3.select(this)
          .transition()
          .duration(100)
          .style({
            'opacity': 1,
          });
      }).on('mouseleave', function() {
        hideChartToolTip();
        d3.select(this)
          .transition()
          .duration(100)
          .style({
            'opacity': 0,
          });
      });
  }
}

let barChartTransformX = 60;
let barChartTransformY = 20;
let xLebelSize = "14px";
let barViewBoxSize = {};

function setBarViewBox() {
  barViewBoxSize = {
    width: 460,
    height: 340,
  };
  barChartTransformX = 60;
  xLebelSize = "14px";
  if (windowWidth <= 1399) {
    barViewBoxSize = {
      width: 400,
      height: 320,
    };
    barChartTransformX = 60;
  }
  if (windowWidth <= 1199) {
    barViewBoxSize = {
      width: 700,
      height: 480,
    };
    barChartTransformX = 60;
  }
  if (windowWidth <= 991) {
    barViewBoxSize = {
      width: 530,
      height: 360,
    };
    barChartTransformX = 60;
  }
  if (windowWidth <= 767) {
    barViewBoxSize = {
      width: 400,
      height: 330,
    };
    barChartTransformX = 30;
  }
  if (windowWidth <= 575) {
    barViewBoxSize = {
      width: (windowWidth - 40) * 0.85,
      height: (windowWidth - 40) * 0.74,
    };
    barChartTransformX = 0;
    xLebelSize = "12px";
  }
}
setBarViewBox();

function initSkillWhenBarChart() {
  const chartContainer = document.getElementById("skill_when-bar_chart");
  const containerClientRect = chartContainer.getBoundingClientRect();
  let windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (containerClientRect.top < windowHeight / 2 && containerClientRect.top > 0) {
    drawChart();
    window.removeEventListener("scroll", initSkillWhenBarChart);
    window.addEventListener("resize", function() {
      if (windowWidth != window.innerWidth) {
        windowWidth = window.innerWidth
        drawChart();
      }
    });
  }

  function drawChart() {
    const skillWhen = d3.select("#skill_when-bar_chart");

    skillWhen.html("");
    const parent = skillWhen.select(function () {
      return this.parentNode;
    });
    const parentWidth = parseInt(parent.style("width"));
    const width = windowWidth <= 575 ? 0.88 * parentWidth : 0.74 * parentWidth;
    const height = windowWidth <= 575 ? 0.57 * parentWidth : 0.53 * parentWidth;

    const data = [
      {
        x: "現在",
        y: 43,
      },
      {
        x: "2年內",
        y: 22,
      },
      {
        x: "3-5年內",
        y: 22,
      },
      {
        x: "6-10年內",
        y: 5,
      },
      {
        x: "10年以上",
        y: 6,
      },
    ];

    skillWhen.attr({
      width: parentWidth,
      height: 0.7 * parentWidth,
      viewBox: `0 0 ${barViewBoxSize.width} ${barViewBoxSize.height}`,
    });

    // Scales
    const scaleX = d3.scale
      .ordinal()
      .domain(
        data.map(function (data) {
          return data.x;
        }),
      )
      .rangeRoundBands([0, width]);

    const scaleY = d3.scale
      .linear()
      .domain([
        0,
        d3.max(data, function (d) {
          return d.y;
        }) * 1.1,
      ])
      .range([height, 0]);

    // axis
    const axisX = d3.svg
      .axis()
      .scale(scaleX)
      .orient("bottom")
      .tickFormat(function (d) {
        return `${d}`;
      })
      .tickPadding(10);

    skillWhen
      .append("g")
      .call(axisX)
      .attr({
        fill: "none",
        class: "x axis",
        transform: `translate(${barChartTransformX}, ${height + barChartTransformY})`,
      })
      .selectAll("text")
      .attr({
        fill: "#000",
        stroke: "none",
      })
      .style({
        "font-size": xLebelSize,
      });

    const axisY = d3.svg.axis().scale(scaleY).orient("left").tickValues([0, 10, 20, 30, 40]);

    skillWhen
      .append("g")
      .call(axisY)
      .attr({
        fill: "none",
        class: "y axis",
        transform: `translate(${barChartTransformX}, ${barChartTransformY})`,
      })
      .selectAll("text")
      .attr({
        fill: "#000",
        stroke: "none",
      })
      .style({
        "font-size": "12px",
      });

    //bar
    var bar = skillWhen
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr({
        fill: "#AE441F",
        class: "bar",
        y: height,
        height: 0,
        transform: `translate(${barChartTransformX + scaleX.rangeBand() / 4}, ${barChartTransformY})`,
      })
      .attr("x", function (d) {
        return scaleX(d.x);
      })
      .attr("width", scaleX.rangeBand() / 2)
      .transition()
      .duration(1500)
      .attr({
        y: function (d) {
          return scaleY(d.y);
        },
        height: function (d) {
          return height - scaleY(d.y);
        },
      });

    // bar.transition()
    //   .duration(1500)
    //   .ease("elastic")
    //   .attr("y", function(d) { return scaleY(d.y); })
    //   .attr("height", function(d) { return height - scaleY(d.y); });

    skillWhen
      .append("text")
      .attr({
        class: "x label",
        transform: `translate(${lineChartTransformX}, ${lineChartTransformY})`,
        x: barChartTransformX - 82,
        y: -10,
      })
      .text("%")
      .style({
        "font-size": xLebelSize,
      });

    skillWhen
      .selectAll("text.bar_data")
      .data(data)
      .enter()
      .append("text")
      .text(function (d) {
        return d.y;
      })
      .attr({
        width: "20",
        fill: "#AE441F",
        "text-anchor": "middle",
        x: function (d) {
          return scaleX(d.x) + scaleX.rangeBand() / 2;
        },
        y: height - 7,
        transform: `translate(${barChartTransformX}, ${barChartTransformY})`,
      })
      .transition()
      .duration(1500)
      .attr({
        y: function (d) {
          return scaleY(d.y) - 7;
        },
      })
      .tween("number", function (d) {
        var i = d3.interpolateRound(0, d.y);
        return function (t) {
          this.textContent = i(t);
        };
      });
  }
}

function initSkillIn3YearsBarChart() {
  const chartContainer = document.getElementById("skill_in_3years-bar_chart");
  const containerClientRect = chartContainer.getBoundingClientRect();
  let windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (containerClientRect.top < windowHeight / 2 && containerClientRect.top > 0) {
    drawChart();
    window.removeEventListener("scroll", initSkillIn3YearsBarChart);
    window.addEventListener("resize", function() {
      if (windowWidth != window.innerWidth) {
        windowWidth = window.innerWidth
        drawChart();
      }
    });
  }
  function drawChart() {
    const skillIn3Years = d3.select("#skill_in_3years-bar_chart");

    skillIn3Years.html("");
    const parent = skillIn3Years.select(function () {
      return this.parentNode;
    });
    const parentWidth = parseInt(parent.style("width"));
    const width = windowWidth <= 575 ? 0.88 * parentWidth : 0.74 * parentWidth;
    const height = windowWidth <= 575 ? 0.57 * parentWidth : 0.53 * parentWidth;

    const data = [
      {
        x: "20%以下",
        y: 31.4,
      },
      {
        x: "20-40%",
        y: 41.9,
      },
      {
        x: "20-60%",
        y: 21.8,
      },
      {
        x: "60-80%",
        y: 4.3,
      },
      {
        x: "80-100%",
        y: 0.6,
      },
    ];

    skillIn3Years.attr({
      width: parentWidth,
      height: 0.7 * parentWidth,
      viewBox: `0 0 ${barViewBoxSize.width} ${barViewBoxSize.height}`,
    });

    // Scales
    const scaleX = d3.scale
      .ordinal()
      .domain(
        data.map(function (data) {
          return data.x;
        }),
      )
      .rangeRoundBands([0, width]);

    const scaleY = d3.scale
      .linear()
      .domain([
        0,
        d3.max(data, function (d) {
          return d.y;
        }) * 1.1,
      ])
      .range([height, 0]);

    // axis
    const axisX = d3.svg
      .axis()
      .scale(scaleX)
      .orient("bottom")
      .tickFormat(function (d) {
        return `${d}`;
      })
      .tickPadding(10);

    skillIn3Years
      .append("g")
      .call(axisX)
      .attr({
        fill: "none",
        class: "x axis",
        transform: `translate(${barChartTransformX}, ${height + barChartTransformY})`,
      })
      .selectAll("text")
      .attr({
        fill: "#000",
        stroke: "none",
      })
      .style({
        "font-size": xLebelSize,
      });

    const axisY = d3.svg.axis().scale(scaleY).orient("left").tickValues([0, 10, 20, 30, 40]);

    skillIn3Years
      .append("g")
      .call(axisY)
      .attr({
        fill: "none",
        class: "y axis",
        transform: `translate(${barChartTransformX}, ${barChartTransformY})`,
      })
      .selectAll("text")
      .attr({
        fill: "#000",
        stroke: "none",
      })
      .style({
        "font-size": "12px",
      });

    //bar
    var bar = skillIn3Years
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr({
        fill: "#AE441F",
        class: "bar",
        y: height,
        height: 0,
        transform: `translate(${barChartTransformX + scaleX.rangeBand() / 4}, ${barChartTransformY})`,
      })
      .attr("x", function (d) {
        return scaleX(d.x);
      })
      .attr("width", scaleX.rangeBand() / 2)
      .transition()
      .duration(1500)
      .attr({
        y: function (d) {
          return scaleY(d.y);
        },
        height: function (d) {
          return height - scaleY(d.y);
        },
      });

    // bar.transition()
    //   .duration(3000)
    //   .ease("elastic")
    //   .attr("y", function(d) { return scaleY(d.y); })
    //   .attr("height", function(d) { return height - scaleY(d.y); });

    skillIn3Years
      .append("text")
      .attr({
        class: "x label",
        transform: `translate(${lineChartTransformX}, ${lineChartTransformY})`,
        x: barChartTransformX - 82,
        y: -10,
      })
      .text("%")
      .style({
        "font-size": xLebelSize,
      });

    skillIn3Years
      .selectAll("text.bar_data")
      .data(data)
      .enter()
      .append("text")
      .text(function (d) {
        return d.y;
      })
      .attr({
        width: "20",
        fill: "#AE441F",
        "text-anchor": "middle",
        x: function (d) {
          return scaleX(d.x) + scaleX.rangeBand() / 2;
        },
        y: height - 7,
        transform: `translate(${barChartTransformX}, ${barChartTransformY})`,
      })
      .transition()
      .duration(1500)
      .attr({
        y: function (d) {
          return scaleY(d.y) - 7;
        },
      })
      .tween("number", function (d) {
        var i = d3.interpolate(0, d.y);
        return function (t) {
          this.textContent = Math.round(i(t) * 10) / 10;
        };
      });
  }
}

let arcChartTransformX = 200;
let arcChartTransformY = 140;
let arcViewBoxSize = {};

function setArcRwd() {
  arcViewBoxSize = {
    width: 400,
    height: 300,
  };
}
setArcRwd();

function initSelfArcChart() {
  const chartContainer = document.getElementById("self-arc_chart");
  const containerClientRect = chartContainer.getBoundingClientRect();
  let windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (containerClientRect.top < windowHeight / 2 && containerClientRect.top > 0) {
    drawChart();
    window.removeEventListener("scroll", initSelfArcChart);
    window.addEventListener("resize", function() {
      if (windowWidth != window.innerWidth) {
        windowWidth = window.innerWidth
        drawChart();
      }
    });
  }
  function drawChart() {
    const arcChart = d3.select("#self-arc_chart");
    arcChart.html("");
    const parent = arcChart.select(function () {
      return this.parentNode;
    });
    const parentWidth = parseInt(parent.style("width"));

    const transitionUnit = 3500;

    arcChart.attr({
      width: parentWidth,
      height: 0.76 * parentWidth,
      viewBox: `0 0 ${arcViewBoxSize.width} ${arcViewBoxSize.height}`,
    });

    let dataArc1 = [{ startAngle: 0, endAngle: 360 * 0.54 * (Math.PI / 180) }];

    const arc1 = d3.svg.arc().innerRadius(50).outerRadius(90);

    arcChart
      .append("path")
      .data(dataArc1)
      .attr({
        d: arc1,
        transform: `translate(${arcChartTransformX},${arcChartTransformY})`,
        fill: "#AE441F",
      })
      .transition()
      .duration(0.54 * transitionUnit)
      .attrTween("d", function (d) {
        var start = { startAngle: 0, endAngle: 0 }; // <-A
        var end = d; // {startAngle: -0.5 * Math.PI, endAngle: 0.5 * Math.PI}
        var interpolate = d3.interpolate(start, end); // <-B
        return function (t) {
          return arc1(interpolate(t)); // <-C
        };
      });

    arcChart
      .append("rect")
      .attr({
        x: 60,
        y: -70,
        width: 0,
        height: 1,
        fill: "#000",
        transform: `translate(${arcChartTransformX - 50},${arcChartTransformY})`,
      })
      .transition()
      .duration(1000)
      .delay(0.54 * transitionUnit + 300)
      .attr({
        x: 0,
        width: 60,
      });

    let arc1_label = arcChart
      .append("text")
      .attr({
        x: 0,
        y: -80,
        transform: `translate(${arcChartTransformX - 80},${arcChartTransformY})`,
      })
      .style({
        opacity: 0,
      })
      .text("");

    arc1_label
      .append("tspan")
      .attr({
        x: 0,
        dy: 0,
        "text-anchor": "middle",
      })
      .style({
        "font-size": "12px",
      })
      .text("台灣員工");
    arc1_label
      .append("tspan")
      .attr({
        x: 5,
        dy: 26,
        "text-anchor": "middle",
      })
      .style({
        "font-size": "26px",
      })
      .text("54");

    arc1_label
      .append("tspan")
      .attr({
        dx: 0,
        dy: 0,
        "text-anchor": "middle",
      })
      .style({
        "font-size": "16px",
      })
      .text("%");

    arc1_label
      .transition()
      .duration(500)
      .delay(0.54 * transitionUnit + 1300)
      .style({
        opacity: 1,
      });

    let dataArc2 = [{ startAngle: 0, endAngle: 360 * 0.66 * (Math.PI / 180) }];

    const arc2 = d3.svg.arc().innerRadius(90).outerRadius(130);

    arcChart
      .append("path")
      .data(dataArc2)
      .attr({
        d: arc2,
        transform: `translate(${arcChartTransformX},${arcChartTransformY})`,
        fill: "#F3E8D3",
      })
      .transition()
      .duration(0.66 * transitionUnit)
      .attrTween("d", function (d) {
        var start = { startAngle: 0, endAngle: 0 }; // <-A
        var end = d; // {startAngle: -0.5 * Math.PI, endAngle: 0.5 * Math.PI}
        var interpolate = d3.interpolate(start, end); // <-B
        return function (t) {
          return arc2(interpolate(t)); // <-C
        };
      });

    arcChart
      .append("rect")
      .attr({
        x: 80,
        y: 90,
        width: 0,
        height: 1,
        fill: "#000",
        transform: `translate(${arcChartTransformX},${arcChartTransformY})`,
      })
      .transition()
      .duration(1000)
      .delay(0.66 * transitionUnit + 300)
      .attr({
        width: 60,
      });

    let arc2_label = arcChart
      .append("text")
      .attr({
        x: 0,
        y: 80,
        transform: `translate(${arcChartTransformX + 165},${arcChartTransformY})`,
      })
      .style({
        opacity: 0,
      })
      .text("");

    arc2_label
      .append("tspan")
      .attr({
        x: 0,
        dy: 0,
        "text-anchor": "middle",
      })
      .style({
        "font-size": "12px",
      })
      .text("全球員工");
    arc2_label
      .append("tspan")
      .attr({
        x: 5,
        dy: 26,
        "text-anchor": "middle",
      })
      .style({
        "font-size": "26px",
      })
      .text("66");

    arc2_label
      .append("tspan")
      .attr({
        dx: 0,
        dy: 0,
        "text-anchor": "middle",
      })
      .style({
        "font-size": "16px",
      })
      .text("%");

    arc2_label
      .transition()
      .duration(500)
      .delay(0.54 * transitionUnit + 1300)
      .style({
        opacity: 1,
      });
  }
}

function initWfhArcChart() {
  const chartContainer = document.getElementById("wfh-arc_chart");
  const containerClientRect = chartContainer.getBoundingClientRect();
  let windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  if (containerClientRect.top < windowHeight / 2 && containerClientRect.top > 0) {
    drawChart();
    window.removeEventListener("scroll", initWfhArcChart);
    window.addEventListener("resize", function() {
      if (windowWidth != window.innerWidth) {
        windowWidth = window.innerWidth
        drawChart();
      }
    });
  }

  function drawChart() {
    const arcChart = d3.select("#wfh-arc_chart");
    arcChart.html("");
    const parent = arcChart.select(function () {
      return this.parentNode;
    });
    const parentWidth = parseInt(parent.style("width"));
    const transitionUnit = 3500;

    arcChart.attr({
      width: parentWidth,
      height: 0.76 * parentWidth,
      viewBox: `0 0 ${arcViewBoxSize.width} ${arcViewBoxSize.height}`,
    });

    let dataArc1 = [{ startAngle: 0, endAngle: 360 * 0.68 * (Math.PI / 180) }];

    const arc1 = d3.svg.arc().innerRadius(50).outerRadius(90);

    arcChart
      .append("path")
      .data(dataArc1)
      .attr({
        d: arc1,
        transform: `translate(${arcChartTransformX},${arcChartTransformY})`,
        fill: "#AE441F",
      })
      .transition()
      .duration(0.68 * transitionUnit)
      .attrTween("d", function (d) {
        var start = { startAngle: 0, endAngle: 0 }; // <-A
        var end = d; // {startAngle: -0.5 * Math.PI, endAngle: 0.5 * Math.PI}
        var interpolate = d3.interpolate(start, end); // <-B
        return function (t) {
          return arc1(interpolate(t)); // <-C
        };
      });

    arcChart
      .append("rect")
      .attr({
        x: 60,
        y: -70,
        width: 0,
        height: 1,
        fill: "#000",
        transform: `translate(${arcChartTransformX - 50},${arcChartTransformY})`,
      })
      .transition()
      .duration(1000)
      .delay(0.68 * transitionUnit + 300)
      .attr({
        x: 0,
        width: 60,
      });

    let arc1_label = arcChart
      .append("text")
      .attr({
        x: 0,
        y: -80,
        transform: `translate(${arcChartTransformX - 80},${arcChartTransformY})`,
      })
      .style({
        opacity: 0,
      })
      .text("");

    arc1_label
      .append("tspan")
      .attr({
        x: 0,
        dy: 0,
        "text-anchor": "middle",
      })
      .style({
        "font-size": "12px",
      })
      .text("台灣員工");
    arc1_label
      .append("tspan")
      .attr({
        x: 5,
        dy: 26,
        "text-anchor": "middle",
      })
      .style({
        "font-size": "26px",
      })
      .text("68");

    arc1_label
      .append("tspan")
      .attr({
        dx: 0,
        dy: 0,
        "text-anchor": "middle",
      })
      .style({
        "font-size": "16px",
      })
      .text("%");

    arc1_label
      .transition()
      .duration(500)
      .delay(0.68 * transitionUnit + 1300)
      .style({
        opacity: 1,
      });

    let dataArc2 = [{ startAngle: 0, endAngle: 360 * 0.63 * (Math.PI / 180) }];

    const arc2 = d3.svg.arc().innerRadius(90).outerRadius(130);

    arcChart
      .append("path")
      .data(dataArc2)
      .attr({
        d: arc2,
        transform: `translate(${arcChartTransformX},${arcChartTransformY})`,
        fill: "#F3E8D3",
      })
      .transition()
      .duration(0.63 * transitionUnit)
      .attrTween("d", function (d) {
        var start = { startAngle: 0, endAngle: 0 }; // <-A
        var end = d; // {startAngle: -0.5 * Math.PI, endAngle: 0.5 * Math.PI}
        var interpolate = d3.interpolate(start, end); // <-B
        return function (t) {
          return arc2(interpolate(t)); // <-C
        };
      });

    arcChart
      .append("rect")
      .attr({
        x: 80,
        y: 90,
        width: 0,
        height: 1,
        fill: "#000",
        transform: `translate(${arcChartTransformX},${arcChartTransformY})`,
      })
      .transition()
      .duration(1000)
      .delay(0.63 * transitionUnit + 300)
      .attr({
        width: 60,
      });

    let arc2_label = arcChart
      .append("text")
      .attr({
        x: 0,
        y: 80,
        transform: `translate(${arcChartTransformX + 165},${arcChartTransformY})`,
      })
      .style({
        opacity: 0,
      })
      .text("");

    arc2_label
      .append("tspan")
      .attr({
        x: 0,
        dy: 0,
        "text-anchor": "middle",
      })
      .style({
        "font-size": "12px",
      })
      .text("全球員工");
    arc2_label
      .append("tspan")
      .attr({
        x: 5,
        dy: 26,
        "text-anchor": "middle",
      })
      .style({
        "font-size": "26px",
      })
      .text("63");

    arc2_label
      .append("tspan")
      .attr({
        dx: 0,
        dy: 0,
        "text-anchor": "middle",
      })
      .style({
        "font-size": "16px",
      })
      .text("%");

    arc2_label
      .transition()
      .duration(500)
      .delay(0.68 * transitionUnit + 1300)
      .style({
        opacity: 1,
      });
  }
}

function initD3Number(target) {
  function floatCount(target) {
    const x = String(target).indexOf(".") + 1;
    return String(target).length - x;
  }
  const selector = d3.selectAll(target);
  selector.each(function () {
    const number_selector = d3.select(this);
    const number = [Number(number_selector.attr("data-number"))];
    const digits = floatCount(number[0]);

    number_selector
      .selectAll("text")
      .data(number)
      .enter()
      .append("text")
      .text(function (d) {
        return d;
      })
      .transition()
      .duration(3000)
      .tween("number", function (d) {
        var i = d3.interpolate(0, d);
        return function (t) {
          console.log()
          this.textContent = (Math.round(i(t) * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits);
        };
      });
  });
}

function initChart1Number() {
  const chartContainer = document.getElementById("chart1-1");
  const containerClientRect = chartContainer.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (containerClientRect.top < windowHeight / 2 && containerClientRect.top > 0) {
    initD3Number(".c1-1");
    window.removeEventListener("scroll", initChart1Number);
  }
}

function initChart2Number() {
  const chartContainer = document.getElementById("chart2-2");
  const containerClientRect = chartContainer.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (containerClientRect.top < windowHeight / 2 && containerClientRect.top > 0) {
    initD3Number(".c2-2");
    window.removeEventListener("scroll", initChart2Number);
  }
}

function d3Resize() {
  d3.select(window).on("resize", function () {
    if (window.innerWidth != windowWidth) {
      windowWidth = window.innerWidth;
      setBarViewBox();
      setViewBox();
    }
  });
}

window.onload = function () {
  window.addEventListener("scroll", initTwVacanciesLineChart);
  window.addEventListener("scroll", initWorkPeopleLineChart);
  window.addEventListener("scroll", initSkillWhenBarChart);
  window.addEventListener("scroll", initSkillIn3YearsBarChart);
  window.addEventListener("scroll", initSelfArcChart);
  window.addEventListener("scroll", initWfhArcChart);
  window.addEventListener("scroll", initChart1Number);
  window.addEventListener("scroll", initChart2Number);
  d3Resize();
};
