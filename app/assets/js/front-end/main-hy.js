/** 世界地圖資料 */
const mapChartData = [
  { x: 0, name: '台灣', value: 88, top: 35.2, left: 79.4 },
  { x: 1, name: '葡萄牙', value: 85, top: 24.2, left: 42.7 },
  { x: 2, name: '新加坡', value: 84, top: 51.3, left: 75.2 },
  { x: 3, name: '中國', value: 83, top: 29.3, left: 75.2 },
  { x: 4, name: '香港', value: 83, top: 35.8, left: 77.5 },
  { x: 5, name: '印度', value: 83, top: 37.8, left: 67.5 },
  { x: 6, name: '羅馬尼亞', value: 82, top: 19.8, left: 51.8 },
  { x: 7, name: '澳洲', value: 81, top: 70.8, left: 83.5 },
  { x: 8, name: '巴西', value: 81, top: 62.8, left: 30 },
  { x: 9, name: '西班牙', value: 80, top: 22.8, left: 44 },
  { x: 10, name: '法國', value: 79, top: 19.8, left: 45.3 },
  { x: 11, name: '德國', value: 79, top: 15.8, left: 47.6 },
  { x: 12, name: '愛爾蘭', value: 79, top: 13.9, left: 42.8 },
  { x: 13, name: '希臘', value: 78, top: 24.8, left: 51 },
  { x: 14, name: '南非', value: 78, top: 74.4, left: 51.8 },
  { x: 15, name: '英國', value: 78, top: 12.1, left: 44 },
  { x: 16, name: '加拿大', value: 77, top: 16.6, left: 22.3 },
  { x: 17, name: '瓜地馬拉', value: 77, top: 42, left: 18.4 },
  { x: 18, name: '瑞典', value: 77, top: 7.9, left: 48.9 },
  { x: 19, name: '奧地利', value: 76, top: 18.2, left: 48.9 },
  { x: 20, name: '比利時', value: 76, top: 16.1, left: 46.3 },
  { x: 21, name: '匈牙利', value: 75, top: 18.5, left: 50.1 },
  { x: 22, name: '以色列', value: 74, top: 29.9, left: 54.6 },
  { x: 23, name: '日本', value: 74, top: 26.3, left: 82.9 },
  { x: 24, name: '瑞士', value: 74, top: 18.7, left: 47.2 },
  { x: 25, name: '美國', value: 74, top: 24.7, left: 18.2 },
  { x: 26, name: '阿根廷', value: 73, top: 77.7, left: 27.2 },
  { x: 27, name: '義大利', value: 72, top: 21.7, left: 48.4 },
  { x: 28, name: '土耳其', value: 71, top: 24.4, left: 54.4 },
  { x: 29, name: '芬蘭', value: 70, top: 7.4, left: 51.4 },
  { x: 30, name: '挪威', value: 70, top: 8.9, left: 47.4 },
  { x: 31, name: '波蘭', value: 70, top: 14.9, left: 50 },
  { x: 32, name: '秘魯', value: 67, top: 59.9, left: 22.7 },
  { x: 33, name: '哥斯大黎加', value: 66, top: 45.5, left: 20.2 },
  { x: 34, name: '荷蘭', value: 66, top: 15, left: 46.5 },
  { x: 35, name: '墨西哥', value: 65, top: 36, left: 15.5 },
  { x: 36, name: '巴拿馬', value: 64, top: 46, left: 21.5 },
  { x: 37, name: '哥倫比亞', value: 61, top: 50, left: 23.4 },
  { x: 38, name: '斯洛伐克', value: 56, top: 17.4, left: 50.2 },
  { x: 39, name: '捷克', value: 49, top: 16.5, left: 49 },
];

/** 老幼黃金交叉資料 */
const lowBirthRate014Data = [
  { x: 0, y: 470.3 },
  { x: 1, y: 362.4 },
  { x: 2, y: 296.3 },
  { x: 3, y: 245.2 },
  { x: 4, y: 209.3 },
  { x: 5, y: 187.8 },
  { x: 6, y: 161.9 },
  { x: 7, y: 138.5 },
];
const lowBirthRate1564Data = [
  { x: 0, y: 1565.2 },
  { x: 1, y: 1705 },
  { x: 2, y: 1681.1 },
  { x: 3, y: 1507 },
  { x: 4, y: 1322.7 },
  { x: 5, y: 1090.8 },
  { x: 6, y: 915.6 },
  { x: 7, y: 775.5 },
];
const lowBirthRate65UpData = [
  { x: 0, y: 192.1 },
  { x: 1, y: 248.8 },
  { x: 2, y: 378.7 },
  { x: 3, y: 556.9 },
  { x: 4, y: 676.8 },
  { x: 5, y: 776.2 },
  { x: 6, y: 761.2 },
  { x: 7, y: 708 },
];

/** Map Chart 世界地圖 */
function onMapChartActive() {
  const mapChart = document.getElementById('map-chart');
  const mapChartClientRect = mapChart.getBoundingClientRect();
	const windowHeight = window.innerHeight;

  // 小於一半 viewport
  if (mapChartClientRect.top < (windowHeight / 2) && mapChartClientRect.top > 0) {
    drawChart();
    window.removeEventListener('scroll', onMapChartActive);
  }

  function drawChart() {
    mapChartData.map(function(mapData) {
      const div = document.createElement('DIV');
      div.classList.add('geotagging');
      if (mapData.name === '台灣') {
        div.classList.add('taiwan');
      }
      if (mapData.value > 70 && mapData.value < 75) {
        div.classList.add('warn');
      }
      if (mapData.value >= 75) {
        div.classList.add('danger');
      }
      div.setAttribute('style', 'top: ' + mapData.top + '%; left: ' + mapData.left + '%;');
      div.innerHTML =
        '<svg viewBox="0 0 15.93 26.25"><use xlink:href="#geotagging"></use></svg><p>' + mapData.name + ' ' + mapData.value + '%' + '</p>';
      mapChart.appendChild(div);
    });
  }
}

/** 老幼黃金交叉折線圖 */
function onLowBirthLineChartActive() {
  const lowBirthLineChart = d3.select('#low-birth-line-chart');
  const lowBirthLineChartBlock = document.getElementById('low-birth-line-chart');
  const lineChartClientRect = lowBirthLineChartBlock.getBoundingClientRect();
	const windowHeight = window.innerHeight;
	let windowWidth = window.innerWidth;

  if (lineChartClientRect.top < (windowHeight / 2) && lineChartClientRect.top > 0) {
    drawChart();
    window.removeEventListener('scroll', onLowBirthLineChartActive);
    window.addEventListener('resize', function() {
      const currentWidth = window.innerWidth;
      if (currentWidth !== windowWidth) {
        windowWidth = currentWidth;
        drawChart();
      }
    });
  }

  function drawChart() {
    const isLargeScreen = window.innerWidth >= 1400;
    const isSmallScreen = window.innerWidth < 600;
    const parent = lowBirthLineChart.select(function() {
      return this.parentNode;
    });
    const parentWidth = parseInt(parent.style('width'));
    let width = parentWidth * 0.79;
    let height = (window.innerWidth) * 0.31;
    let svgWidth = window.innerWidth * 0.9;
    let svgHeight = window.innerWidth * 0.5;
    let translateX = 86;
    let translateY = 50;

    lowBirthLineChart.html('');

    if (isLargeScreen) {
      width = 900;
      height = 450;
      svgWidth = 1200;
      svgHeight = 700;
    }
    if (isSmallScreen) {
      // width = parentWidth;
      height = (window.innerWidth) * 0.7;
      svgWidth = parentWidth;
      svgHeight = parentWidth;
      translateX = 55;
      translateY = 30;
    }

    lowBirthLineChart.attr({
      width: svgWidth,
      height: svgHeight,
    });

    const scaleX = d3.scale.linear()
      .range([0, width])
      .domain([0, 7]);
    const scaleY = d3.scale.linear()
      .range([height, 0])
      .domain([0, 2000]);

    const line = d3.svg.line()
      .x(function(d) {
        return scaleX(d.x);
      })
      .y(function(d) {
        return scaleY(d.y);
      });

    const axisX = d3.svg.axis()
      .scale(scaleX)
      .orient('bottom')
      .tickValues([0,1,2,3,4,5,6,7])
      .tickFormat(function(d) { return `20${d}0`; })
      .ticks(7)
      .tickPadding(((width / 14) * 0.3));

    const axisY = d3.svg.axis()
      .scale(scaleY)
      .orient('left')
      .ticks(4)
      .tickFormat(function(d) { return d ? d + ' 萬': d; })
      .tickPadding(((width / 14) * 0.3));

    const axisXGrid = d3.svg.axis()
      .scale(scaleX)
      .orient('bottom')
      .ticks(7)
      .tickFormat('')
      .tickSize(-height, 0);

    const axisYGrid = d3.svg.axis()
      .scale(scaleY)
      .orient('left')
      .ticks(5)
      .tickFormat('')
      .tickSize(-width, 0);

    // Axis Grid line
    lowBirthLineChart.append('rect')
      .attr({
        width,
        height,
        fill: '#fff',
        transform: `translate(${translateX}, ${translateY})`,
      });

    // 黃色區塊遮罩
    lowBirthLineChart.append('rect')
      .attr({
        'width': width / 14 * 9,
        'height': height,
        'fill': '#FFFCD7',
        'transform': `translate(${ (width / 14 * 5) + translateX}, ${translateY})`,
        'style': 'opacity: 0;',
      })
      .transition()
      .duration(1000)
      .delay(5000)
      .style({
        'opacity': 1,
      });
    // 黃色區塊左邊線
    lowBirthLineChart.append('rect')
      .attr({
        'width': 1,
        'height': height,
        'fill': '#000',
        'transform': `translate(${ (width / 14 * 5) + translateX}, ${translateY})`,
        'style': 'opacity: 0;',
      })
      .transition()
      .duration(1000)
      .delay(5000)
      .style({
        'opacity': 1,
      });
    // 2025年文字
    lowBirthLineChart.append('text')
      .attr({
        'x': isSmallScreen ? ((width / 14) * 6.4) : ((width / 14) * 9.2),
        'y': (height / 12) * 1,
        'transform': `translate(${translateX}, ${translateY})`,
      }).style({
        'font-size': isLargeScreen ? '18px' : '12px',
        'opacity': 0,
      }).text(isSmallScreen ? '2025年：老年人口>20%' : '2025年')
      .transition()
      .duration(1000)
      .delay(5000)
      .style({
        'opacity': 1,
      });
    lowBirthLineChart.append('text')
      .attr({
        'x': isSmallScreen ? ((width / 28) * 11.5) : ((width / 28) * 13) + (isLargeScreen ? 20 : 14),
        'y': (height / 12) * 1 + (isLargeScreen ? 24 : 18),
        'transform': `translate(${translateX}, ${translateY})`,
      }).style({
        'font-size': isLargeScreen ? '18px' : '12px',
        'opacity': 0,
      }).text(isSmallScreen ? '台灣將正式進入超高齡化社會' : '老年人口>20%，台灣將正式進入超高齡化社會')
      .transition()
      .duration(1000)
      .delay(5000)
      .style({
        'opacity': 1,
      });

    // 折線段
    lowBirthLineChart.append('path')
      .attr({
        'd': line(lowBirthRate014Data),
        'stroke': '#999',
        'stroke-width': isSmallScreen ? '2px' : '3px',
        'fill': 'none',
        'transform': `translate(${translateX}, ${translateY})`
      });
    lowBirthLineChart.append('path')
      .attr({
        'd': line(lowBirthRate1564Data),
        'stroke': '#AE4420',
        'stroke-width': isSmallScreen ? '2px' : '3px',
        'fill': 'none',
        'transform': `translate(${translateX}, ${translateY})`
      });
    lowBirthLineChart.append('path')
      .attr({
        'd': line(lowBirthRate65UpData),
        'stroke': '#C7B299',
        'stroke-width': isSmallScreen ? '2px' : '3px',
        'fill': 'none',
        'transform': `translate(${translateX}, ${translateY})`
      });

    // 2015年文字
    lowBirthLineChart.append('rect')
      .attr({
        'x': (width / 14) * 3,
        'y': 5 * (height / 36),
        'width': 1,
        'height': 0,
        'fill': '#999',
        'transform': `translate(${translateX}, ${translateY})`,
      })
      .transition()
      .duration(1000)
      .delay(3000)
      .attr({
        'y': height / 36,
        'height': (height / 8) * 1,
      });
    lowBirthLineChart.append('text')
      .attr({
        'x': isSmallScreen ? (width / 14 * 0.5) : ((width / 14) * 2.5),
        'y': -((width / 14) * 0.5),
        'transform': `translate(${translateX}, ${translateY})`,
      }).style({
        'font-size': isLargeScreen ? '18px' : '12px',
        'opacity': 0,
      }).text(isSmallScreen ? '勞動人口一路下滑' : '2015年')
      .transition()
      .duration(1000)
      .delay(3000)
      .style({
        'opacity': 1,
      });
    lowBirthLineChart.append('text')
      .attr({
        'x': ((width / 14) * 1) + (isLargeScreen ? 20 : 14),
        'y': -((width / 14) * 0.5) + (isLargeScreen ? 24 : 18),
        'transform': `translate(${translateX}, ${translateY})`,
      }).style({
        'font-size': isLargeScreen ? '18px' : '12px',
        'opacity': 0,
      }).text(isSmallScreen ? '' : '勞動人口(15-64歲)一路下滑')
      .transition()
      .duration(1000)
      .delay(3000)
      .style({
        'opacity': 1,
      });

    // 2017年文字
    lowBirthLineChart.append('rect')
      .attr({
        'x': ((width / 70) * 16),
        'y': 5 * (height / 36) + ((height / 16) * 11.5),
        'width': 1,
        'height': 0,
        'fill': '#999',
        'transform': `translate(${translateX}, ${translateY})`,
      })
      .transition()
      .duration(1000)
      .delay(4000)
      .attr({
        'y': (height / 16) * 11.4,
        'height': (height / 8) * 1,
      });
    lowBirthLineChart.append('text')
      .attr({
        'x': isSmallScreen ? ((width / 70) * 6) : ((width / 70) * 14),
        'y': (height / 8) * 5,
        'transform': `translate(${translateX}, ${translateY})`,
      }).style({
        'font-size': isLargeScreen ? '18px' : '12px',
        'opacity': 0,
      }).text(isSmallScreen ? '老年人口超越' : '2017年')
      .transition()
      .duration(1000)
      .delay(4000)
      .style({
        'opacity': 1,
      });
    lowBirthLineChart.append('text')
      .attr({
        'x': isSmallScreen ? ((width / 14) * 2) : ((width / 14) * 1.5) + (isLargeScreen ? 20 : 14),
        'y': (height / 8) * 5 + (isLargeScreen ? 24 : 18),
        'transform': `translate(${translateX}, ${translateY})`,
      }).style({
        'font-size': isLargeScreen ? '18px' : '12px',
        'opacity': 0,
      }).text(isSmallScreen ? '幼年人口' : '老年人口超越幼年人口')
      .transition()
      .duration(1000)
      .delay(4000)
      .style({
        'opacity': 1,
      });

    // 動畫遮線條用白色區塊
    lowBirthLineChart.append('rect')
      .attr({
        'width': width,
        'height': height,
        'fill': '#fff',
        'transform': `translate(${translateX}, ${translateY})`,
      })
      .transition()
      .duration(3000)
      .attr({'transform': `translate(${width + translateX}, ${translateY})`})
      .style({
        'width': '0',
      });

    lowBirthLineChart.append('g')
      .call(axisXGrid)
      .attr({
        'fill': 'none',
        'stroke': 'rgba(0, 0, 0, 0.1)',
        'transform': `translate(${translateX}, ${height + translateY})`
      });

    lowBirthLineChart.append('g')
      .call(axisYGrid)
      .attr({
        'fill': 'none',
        'stroke': 'rgba(0, 0, 0, 0.1)',
        'transform': `translate(${translateX}, ${translateY})`,
      });

    // Axis 
    lowBirthLineChart.append('g')
      .call(axisX)
      .attr({
        'fill': 'none',
        'transform': `translate(${translateX}, ${height + translateY})`,
      })
      .selectAll('text')
      .attr({
        'fill': '#000',
        'stroke': 'none',
      }).style({
        'font-size': isLargeScreen ? '18px' : '12px',
      });
    lowBirthLineChart.append('g')
      .call(axisY)
      .attr({
        'fill': 'none',
        'transform': `translate(${translateX}, ${translateY})`
      }).selectAll('text')
      .attr({
        'fill': '#000',
        'stroke': 'none',
      }).style({
        'font-size': isLargeScreen ? '18px' : '12px',
      });
    lowBirthLineChart.append('text')
      .attr({
        'x': isSmallScreen ? width - 45 : width + 10,
        'y': isSmallScreen ? ((height / 5) * 2.5) : (height / 5) * 3 + (isLargeScreen ? 10 : 7),
        'transform': `translate(${translateX}, ${translateY})`,
      }).style({
        'font-size': isLargeScreen ? '18px' : '12px',
        'opacity': 0,
      }).text('15~64歲')
      .transition()
      .duration(1000)
      .delay(2500).style({
        'opacity': 1,
      });
    lowBirthLineChart.append('text')
      .attr({
        'x': isSmallScreen ? width - 50 : width + 10,
        'y': (height / 5) * 3.3 + (isLargeScreen ? 10 : 7),
        'transform': `translate(${translateX}, ${translateY})`,
      }).style({
        'font-size': isLargeScreen ? '18px' : '12px',
        'opacity': 0,
      }).text('65歲以上')
      .transition()
      .duration(1000)
      .delay(2500).style({
        'opacity': 1,
      });
    lowBirthLineChart.append('text')
      .attr({
        'x': isSmallScreen ? width - 40 : width + 10,
        'y': isSmallScreen ? (height / 12) * 10.8 : (height / 12) * 11.1 + (isLargeScreen ? 10 : 7),
        'transform': `translate(${translateX}, ${translateY})`,
      }).style({
        'font-size': isLargeScreen ? '18px' : '12px',
        'opacity': 0,
      }).text('0~14歲')
      .transition()
      .duration(1000)
      .delay(2500).style({
        'opacity': 1,
      });
    lowBirthLineChart.append('text')
      .attr({
        'x': width + (width / 14) * 0.5,
        'y': height + (width / 14) * 0.3 + (isLargeScreen ? 20 : 14),
        'transform': `translate(${translateX}, ${translateY})`,
      }).style({
        'font-size': isLargeScreen ? '18px' : '12px',
      }).text('年');
    lowBirthLineChart.append('text')
      .attr({
        'x': -((width / 14) * 0.3 + (isLargeScreen ? 40 : 30)),
        'y': -((width / 14) * 0.5),
        'transform': `translate(${translateX}, ${translateY})`,
      }).style({
        'font-size': isLargeScreen ? '18px' : '12px',
      }).text('人數');

    // Circles
    if (!isSmallScreen) {
      lowBirthLineChart.selectAll('circle.gray')
        .data(lowBirthRate014Data)
        .enter()
        .append('circle')
        .attr({
          'fill': '#fff',
          'stroke': '#999',
          'stroke-width': '5',
          'r': 5,
          'cx': function(d) {
            return scaleX(d.x);
          },
          'cy': function(d) {
            return scaleY(d.y);
          },
          'transform': `translate(${translateX}, ${translateY})`,
        }).style({
          'opacity': 0,
          'cursor': 'pointer',
        }).on('mouseover', function(d) {
          const tooltipConfig = {
            color: '#999',
            title: '0~14歲',
            value: `${d.y} 萬`,
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
      lowBirthLineChart.selectAll('circle.red')
        .data(lowBirthRate1564Data)
        .enter()
        .append('circle')
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
          'transform': `translate(${translateX}, ${translateY})`,
        }).style({
          'opacity': 0,
          'cursor': 'pointer',
        }).on('mouseover', function(d) {
          const tooltipConfig = {
            color: '#AE4420',
            title: '15~64歲',
            value: `${d.y} 萬`,
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
      lowBirthLineChart.selectAll('circle.brown')
        .data(lowBirthRate65UpData)
        .enter()
        .append('circle')
        .attr({
          'fill': '#fff',
          'stroke': '#C7B299',
          'stroke-width': '5',
          'r': 5,
          'cx': function(d) {
            return scaleX(d.x);
          },
          'cy': function(d) {
            return scaleY(d.y);
          },
          'transform': `translate(${translateX}, ${translateY})`,
        }).style({
          'opacity': 0,
          'cursor': 'pointer',
        }).on('mouseover', function(d) {
          const tooltipConfig = {
            color: '#C7B299',
            title: '65歲以上',
            value: `${d.y} 萬`,
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
}

/** 國家長條圖 */
function onCountriesBarChartActive() {
  const countriesBarChart = d3.select('#countries-bar-chart');
  const countriesBarChartBlock = document.getElementById('countries-bar-chart');
  const barChartClientRect = countriesBarChartBlock.getBoundingClientRect();
  const windowHeight = window.innerHeight;
	let windowWidth = window.innerWidth;

  if (barChartClientRect.top < (windowHeight / 3 * 2) && barChartClientRect.top > 0) {
    drawChart();
    window.removeEventListener('scroll', onCountriesBarChartActive);
    window.addEventListener('resize', function() {
      const currentWidth = window.innerWidth;
      if (currentWidth !== windowWidth) {
        windowWidth = currentWidth;
        drawChart();
      }
    });
  }

  function drawChart() {
    countriesBarChart.html('');
    countriesBarChart.append('svg').attr({
      width: '100%',
      height: mapChartData.length * 30,
    }).selectAll('rect')
      .data(mapChartData)
      .enter()
      .append('g')
      .append('rect')
      .attr({
        'fill': '#FFDD4D',
        'width': 0,
        'height': 8,
        'x': 0,
        'y': function(d) {
          return (d.x) * 30;
        },
      })
      .transition()
      .duration(3000)
      .attr({
        'width': function(d) {
          return `${d.value * 0.8}%`;
        },
      })
      .attrTween('fill', function(d) {
        let fillColor = '#FFDD4D';
        if (d.value > 75 && d.value < 88) {
          fillColor = '#FF7E27';
        }
        if (d.value > 85) {
          fillColor = '#DD170E';
        }
        return d3.interpolateRgb('#FFDD4D', fillColor);
      });

    // 全球平均線
    countriesBarChart.select('svg').append('path')
      .attr({
        'd': `M0 ${20 * 30 + 20} H${window.innerWidth}`,
        'stroke': '#777',
        'stroke-width': '1px',
        'stroke-dasharray': '2',
        'fill': 'none',
      });

    countriesBarChart.select('svg').append('text')
      .attr({
        'x': window.innerWidth - 45,
        'y': 20 * 30 + 25,
        'class': 'text-average',
      }).style({
        'font-size': '13px',
      }).append('tspan').attr({ 'x': window.innerWidth - 45, 'dy': 16 }).text('全');
    countriesBarChart.select('.text-average').append('tspan').attr({ 'x': window.innerWidth - 45, 'dy': 16 }).text('球');
    countriesBarChart.select('.text-average').append('tspan').attr({ 'x': window.innerWidth - 45, 'dy': 16 }).text('平');
    countriesBarChart.select('.text-average').append('tspan').attr({ 'x': window.innerWidth - 45, 'dy': 16 }).text('均');
    countriesBarChart.select('.text-average').append('tspan').attr({ 'x': window.innerWidth - 50, 'dy': 18 }).text('75%');

    countriesBarChart.selectAll('g')
      .append('text')
      .attr({
        'fill': '#000',
        'x': 10,
        'y': function(d) {
          return (d.x) * 30 + 11;
        },
      }).style({
        'font-size': '13px',
      }).text(function(d) {
        return `${d.name} ${d.value}%`;
      })
      .transition()
      .duration(3000)
      .attr({
        'x': function(d) {
          return `${d.value * 0.8 + 10}%`;
        },      
      })
      .tween('number', function(d) {
        const i = d3.interpolateRound(0, d.value);
        return function(t) {
          this.textContent = `${d.name} ${i(t)}%`;
        }
      });

    countriesBarChart.selectAll('div')
      .data(mapChartData)
      .enter()
      .append('div')
      .attr({
        'class': 'flag',
      }).style({
        'left': 0,
        'top': function(d) {
          return `${(d.x) * 30 - 2}px`;
        },
        'background-position-x': function(d) {
          return `${(100 / 39) * (d.x)}%`;
        },
      })
      .transition()
      .duration(3000)
      .style({
        'left': function(d) {
          return `${d.value * 0.8 + 1.5}%`
        },
      });
  }
}

/**
 * 顯示圖表 Tooltip
 * @param {Object} config 設定 { color: 顏色, title: 標題說明, value: 數值 }
 * color 需與 title 一起使用
 */
function showChartToolTip(config) {
  const chartTooltip = d3.select('#chart-tooltip');
  const { color, title, value } = config;
  const mousePos = getMousePos();

  chartTooltip.attr({
    'class': 'show',
  }).style({
    'left': `${mousePos.x - 30}px`,
    'top': `${mousePos.y - ((color && title) ? 70 : 45)}px`,
  });

  if(color && title) {
    chartTooltip.append('section')
      .append('div')
      .attr({
        'class': 'tooltip-color',
      })
      .style({
        'background': color,
      });
    chartTooltip.select('section').append('p')
      .attr({
        'class': 'tooltip-title',
      }).text(title);
  }

  chartTooltip.append('p')
    .attr({
      'class': 'tooltip-value',
    }).text(value);
}

/** 隱藏圖表 Tooltip */
function hideChartToolTip() {
  const chartTooltip = d3.select('#chart-tooltip');
  chartTooltip.selectAll('section').remove();
  chartTooltip.selectAll('p').remove();
  chartTooltip.attr({
    'class': null,
  });
}

/** 取得滑鼠位置 */
function getMousePos() {
  const e = event || window.event;
  return { x: e.clientX, y: e.clientY };
}

$(function() {
  window.addEventListener('scroll', onMapChartActive);
  window.addEventListener('scroll', onLowBirthLineChartActive);
  window.addEventListener('scroll', onCountriesBarChartActive);
});
