let bad = '#d00';
let worry = '#d70';
let okay = '#dd0';
let good = '#690';
let perfect = '#0a0';

let STYLE_SPARK_BASE = {
  colors: [
    '#39f', '#bb3', '#188', '#d62',
    '#a28', '#999', '#63b', '#8b3'],
  chart: {
    backgroundColor: null,
    borderWidth: 0,
    margin: [2, 0, 2, 0],
    width: 120,
    height: 30,
    style: {overflow: 'visible'},
    skipClone: true
  },
  time: {
    timezone: 'Europe/Oslo'
  },
  title: {text: ''},
  credits: {enabled: false},
  xAxis: {
    crosshair: true,
    labels: {enabled: false},
    title: {text: null},
    startOnTick: false,
    endOnTick: false,
    tickPositions: [],
    lineWidth: 0
  },
  yAxis: {
    endOnTick: false,
    startOnTick: false,
    labels: {enabled: false},
    title: {text: null},
    lineWidth: 0,
    tickPositioner: function () {
      return range(this.dataMin, this.dataMax + 1, (this.dataMax - this.dataMin) / 2);
    }
  },
  legend: {enabled: false},
  navigator: {enabled: false},
  scrollbar: {enabled: false},
  rangeSelector: {enabled: false},
  tooltip: {
    backgroundColor: 'white',
    outside: true,
    hideDelay: 0,
    style: {
      padding: 0
    },
    formatter: function () {
      return this.points.map(function (point) {
        return '<span style="color:' + point.series.color + '">●</span><b>' + padT(point.y) + '</b>';
      });
    }
  },
  plotOptions: {
    dataGrouping: {enabled: false},
    series: {
      turboThreshold: 0,
      dataGrouping: {enabled: false},
      animation: false,
      lineWidth: 1,
      shadow: false,
      states: {
        hover: {
          halo: {size: 0},
          lineWidth: 1
        }
      },
      marker: {
        enabled: false,
        symbol: 'circle',
        radius: 2,
        states: {
          hover: {
            fillColor: null,
            lineColor: 'rgb(100, 100, 100)',
            lineWidth: 1
          }
        }
      }
    }
  }
};

let STYLE_SPARK_SPLINE = merge(STYLE_SPARK_BASE, {
  chart: {
    type: 'spline'
  }
});

let STYLE_SPARK_SCATTER = merge(STYLE_SPARK_BASE, {
  chart: {
    type: 'scatter'
  }
});

/**
 * Holds general configuration about HighChart charts.
 */
let STYLE_BASE = {
    colors: [
      '#39f', '#bb3', '#188', '#d62',
      '#a28', '#999', '#63b', '#8b3'],
    chart: {
      spacing: 100,
      margin: 100,
      padding: 100
    },
    time: {
      timezone: 'Europe/Oslo'
    },
    title: {text: ''},
    credits: {text: ''},
    plotOptions: {
      series: {
        turboThreshold: 0,
        dataGrouping: {
          enabled: false
        },
        marker: {
          enabled: false,
          symbol: 'circle',
          radius: 5,
          states: {
            hover: {
              radius: 6,
              fillColor: null,
              lineColor: 'rgb(100, 100, 100)',
              lineWidth: 1
            }
          }
        },
        events: {
          legendItemClick: function () {
            let serie = this;
            let id = this.index;
            let chart = this.chart;
            let visible = this.visible;

            if (visible) {
              chart.series[id].hide();
            } else {
              chart.series[id].show();
            }

            for (let index in chart.series) {
              if (index !== id) {
                if (visible) {
                  chart.series[index].show();
                } else {
                  chart.series[index].hide();
                }
              }
            }

            for (let index in chart.xAxis) {
              if (chart.xAxis[index].options._type === serie.name) {
                chart.xAxis[index].update({visible: !visible});
              } else {
                chart.xAxis[index].update({visible: visible});
              }
            }

            for (let index in chart.yAxis) {
              if (chart.yAxis[index].options._type === serie.options.name) {
                chart.yAxis[index].update({visible: !visible});
              } else {
                chart.yAxis[index].update({visible: visible});
              }
            }
          }
        }
      }
    },
    legend: {
      enabled: true,
      y: 60,
      align: 'right',
      layout: 'vertical',
      verticalAlign: 'top'
    },
    navigator: {
      enabled: true,
      margin: 5,
      height: 35,
      outlineWidth: 0,
      outlineColor: 'transparent',
      xAxis: {labels: {enabled: false}},
      yAxis: {lineWidth: 0},
      handles: {
        height: 20,
        width: 8,
        backgroundColor: 'white',
        borderColor: 'black'
      }
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: 800,
        },
        chartOptions: {
          legend: {
            y: 0,
            align: 'center',
            layout: 'horizontal',
            verticalAlign: 'bottom'
          }
        }
      }]
    },
    tooltip: {
      useHTML: true,
      shared: true,
      split: true,
      outside: true,
      backgroundColor: 'white',
      positioner: function (width, height, point) {
        let point_pos = point.plotX + this.chart.plotLeft - width / 2;
        let max_right = this.chart.chartWidth - width / 2 - this.chart.marginRight;

        if (point.isHeader) {
          return {
            x: Math.max(0, Math.min(point_pos, max_right)),
            y: this.chart.chartHeight
          };
        } else {
          return {
            x: Math.max(0, Math.min(point_pos, max_right)),
            y: 0
          };
        }
      },
      formatter: base_tooltip_formatter
    },
    rangeSelector: {
      enabled: true,
      verticalAlign: 'top',
      inputEnabled: true,
      inputDateFormat: '%d.%m.%Y %H:%M',
      inputEditDateFormat: '%d.%m.%Y %H:%M',
      inputBoxWidth: 100,
      inputPosition: {
        align: 'left',
        y: -32,
        x: 0
      }
      ,
      buttonPosition: {
        align: 'left',
        y: 32,
        x: 0
      }
      ,
      buttons: [{
        type: 'second',
        count: 60,
        text: '60s'
      }, {
        type: 'minute',
        count: 5,
        text: '5min'
      }, {
        type: 'minute',
        count: 30,
        text: '30min'
      }, {
        type: 'hour',
        count: 1,
        text: '1h'
      }, {
        type: 'hour',
        count: 12,
        text: '12h'
      }, {
        type: 'day',
        count: 1,
        text: '1d'
      }, {
        type: 'all',
        text: 'All'
      }]
    }
    ,
    scrollbar: {
      height: 5,
      margin:
        0,
      minWidth:
        0,
      showFull:
        false,
      zIndex:
        0,
      barBackgroundColor:
        'transparent',
      barBorderColor:
        'transparent',
      barBorderRadius:
        0,
      barBorderWidth:
        0,
      buttonBackgroundColor:
        'transparent',
      buttonArrowColor:
        'transparent',
      buttonBorderColor:
        'transparent',
      buttonBorderWidth:
        0,
      buttonBorderRadius:
        0,
      trackBackgroundColor:
        'transparent',
      trackBorderColor:
        'transparent',
      trackBorderWidth:
        0,
      trackBorderRadius:
        0,
      rifleColor:
        'transparent'
    }
  }
;

let STYLE_SPLINE = merge(STYLE_BASE, {
  chart: {type: 'spline'}
});

let STYLE_STATUSLINE = merge(STYLE_BASE, {
  chart: {type: 'line'}
});

let STYLE_SCATTER = merge(STYLE_BASE, {
  chart: {type: 'scatter'}
});

let STYLE_COLUMN = merge(STYLE_BASE, {
  chart: {type: 'column'}
});

let STYLE_BAR = merge(STYLE_BASE, {
  chart: {type: 'bar'}
});

let STYLE_PIE = merge(STYLE_BASE, {
  chart: {type: 'pie'},
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      }
    }
  }
});

let STYLE_GAUGE = merge(STYLE_BASE, {
  chart: {
    height: 250,
    type: 'pie',
    plotBackgroundColor: null,
    plotBorderWidth: 0,
    plotShadow: false
  },
  legend: {
    y: 0,
    align: 'center',
    layout: 'horizontal',
    verticalAlign: 'bottom'
  },
  tooltip: {
    split: false,
    positioner: function () {
      return {
        x: this.chart.plotLeft + this.chart.plotWidth / 2 - this.label.width / 2,
        y: this.chart.plotTop + this.chart.plotHeight - this.label.height
      };
    },
    formatter: function () {
      return this.point.options.description + '\n'
        + this.point.y + '% (' + this.point.abs + '/' + this.point.sum + ')';
    }
  },
  plotOptions: {
    pie: {
      dataLabels: {
        enabled: true,
        distance: -50,
        style: {
          fontWeight: 'bold',
          color: 'white'
        }
      },
      startAngle: -90,
      endAngle: 90,
      center: ['50%', '100%'],
      size: '200%'
    }
  },
  scrollbar: {
    enabled: false
  },
  rangeSelector: {
    enabled: false
  },
  navigator: {
    enabled: false,
  }
});

let STYLE_CHART = {
  'spline': STYLE_SPLINE,
  'statusline': STYLE_STATUSLINE,
  'pie': STYLE_PIE,
  'gauge': STYLE_GAUGE,
  'bar': STYLE_BAR,
  'column': STYLE_COLUMN,
};

function chart(metric_idfy, metric_cap, values) {
  switch (values.type) {
    case 'pie': {
      pie(metric_idfy, metric_cap, values);
      break;
    }
    case 'gauge': {
      gauge(metric_idfy, metric_cap, values);
      break;
    }
    case 'statusline': {
      statusline(metric_idfy, metric_cap, values);
      break;
    }
    case 'spline':
    case 'column':
    default: {
      _default(metric_idfy, metric_cap, values);
      break;
    }
  }
}

function chart_compare(metric_idfy, metric_cap, values) {
  Highcharts.stockChart(metric_idfy, merge(STYLE_CHART[values.type], {
    xAxis: {
      minorTickInterval: 'auto',
      startOnTick: true,
      endOnTick: true,
      lineWidth: 1,
      lineColor: '#333',
      _type: 0,
      labels: {
        rotation: -45,
        x: -10,
        y: 30,
        align: 'center',
        formatter: function () {
          return time(this.value, '%d.%m.<br>%H:%M:%S.%f');
        }
      }
    },
    yAxis: {
      minorTickInterval: 'auto',
      startOnTick: true,
      endOnTick: true,
      lineWidth: 1,
      lineColor: '#333',
      opposite: false,
      title: {text: values.unit || ''},
      _type: 0
    },
    tooltip: {
      useHTML: true,
      shared: true,
      split: true,
      outside: true,
      backgroundColor: 'white',
      positioner: function (width, height, point) {
        let point_pos = point.plotX + this.chart.plotLeft - width / 2;
        let max_right = this.chart.chartWidth - width / 2 - this.chart.marginRight;

        if (point.isHeader) {
          return {
            x: Math.max(0, Math.min(point_pos, max_right)),
            y: this.chart.chartHeight
          };
        } else {
          return {
            x: Math.max(0, Math.min(point_pos, max_right)),
            y: 0
          };
        }
      },
      formatter: base_tooltip_formatter_compare
    },
    rangeSelector: {
      inputEnabled: false
    },
    legend: {enabled: true},
    series: [{
      name: v_index(1) + ' ' + metric_cap + v_empty(' (%s)', values.unit),
      data: values.series[0],
      unit: values.unit,
      showInLegend: true
    }, {
      name: v_index(2) + ' ' + metric_cap + v_empty(' (%s)', values.unit),
      data: values.series[1],
      unit: values.unit,
      showInLegend: true
    }]
  }));
}

function _default(metric_idfy, metric_cap, values) {
  let data = markMinMax(values.data, values.min['val'], values.max['val']);
  let cumulative = markPercentile(
    values.cumulative,
    values.p5['val'],
    values.p25['val'],
    values.p50['val'],
    values.p75['val'],
    values.p95['val']);

  Highcharts.stockChart(metric_idfy, merge(STYLE_CHART[values.type], {
    xAxis: [{
      minorTickInterval: 'auto',
      startOnTick: true,
      endOnTick: true,
      lineWidth: 1,
      lineColor: '#333',
      _type: metric_cap + v_empty(' (%s)', values.unit),
      labels: {
        rotation: -45,
        x: -10,
        y: 30,
        align: 'center',
        formatter: function () {
          return time(this.value, '%d.%m.<br>%H:%M:%S.%f');
        }
      }
    }, {
      visible: false,
      title: {text: values.unit || ''},
      startOnTick: true,
      endOnTick: true,
      lineWidth: 1,
      lineColor: '#333',
      _type: 'Cumulative distribution',
      labels: {
        align: 'center',
        formatter: function () {
          return this.value;
        }
      }
    }],
    yAxis: [{
      minorTickInterval: 'auto',
      startOnTick: true,
      endOnTick: true,
      lineWidth: 1,
      lineColor: '#333',
      opposite: false,
      title: {text: values.unit || ''},
      _type: metric_cap + v_empty(' (%s)', values.unit),
    }, {
      visible: false,
      title: {text: '%'},
      min: 0,
      max: 100,
      _type: 'Cumulative distribution'
    }],
    tooltip: {
      useHTML: true,
      shared: true,
      split: true,
      outside: true,
      backgroundColor: 'white',
      positioner: function (width, height, point) {
        let point_pos = point.plotX + this.chart.plotLeft - width / 2;
        let max_right = this.chart.chartWidth - width / 2 - this.chart.marginRight;

        if (point.isHeader) {
          return {
            x: Math.max(0, Math.min(point_pos, max_right)),
            y: this.chart.chartHeight
          };
        } else {
          return {
            x: Math.max(0, Math.min(point_pos, max_right)),
            y: 0
          };
        }
      },
      formatter: base_tooltip_formatter
    },
    legend: {enabled: true},
    series: [{
      name: metric_cap + v_empty(' (%s)', values.unit),
      data: data,
      unit: values.unit,
      showInLegend: true,
      xAxis: 0,
      yAxis: 0
    }, {
      name: 'Cumulative distribution',
      data: cumulative,
      unit: values.unit,
      type: 'spline',
      visible: false,
      xAxis: 1,
      yAxis: 1
    }]
  }));
}

function pie(metric_idfy, metric_cap, values) {
  Highcharts.stockChart(metric_idfy, merge(STYLE_CHART[values.type], {
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false
        },
        showInLegend: true
      }
    },
    legend: {enabled: true},
    series: [{
      name: metric_cap,
      data: values.data,
      showInLegend: true
    }]
  }));
}

function gauge(metric_idfy, metric_cap, values) {
  Highcharts.stockChart(metric_idfy, merge(STYLE_CHART[values.type], {
    series: [{
      innerSize: '50%',
      data: values.data,
      zones: [{
        value: 50,
        color: bad
      }, {
        value: 75,
        color: worry
      }, {
        value: 80,
        color: okay
      }, {
        value: 90,
        color: good
      }, {
        color: perfect
      }]
    }],
  }));
}

function statusline(metric_idfy, metric_cap, values) {
  let data = markStatusChange(values.data);

  Highcharts.stockChart(metric_idfy, merge(STYLE_CHART[values.type], {
    xAxis: [{
      minorTickInterval: 'auto',
      startOnTick: true,
      endOnTick: true,
      lineWidth: 1,
      lineColor: '#333',
      _type: metric_cap + v_empty(' (%s)', values.unit),
      labels: {
        rotation: -45,
        x: -10,
        y: 30,
        align: 'center',
        formatter: function () {
          return time(this.value, '%d.%m.<br>%H:%M:%S.%f');
        }
      }
    }],
    yAxis: [{
      minorTickInterval: 'auto',
      startOnTick: true,
      endOnTick: true,
      lineWidth: 1,
      lineColor: '#333',
      opposite: false,
      min: -0.1,
      max: 1.1,
      labels: {
        enabled: true,
        formatter: function () {
          switch (this.value) {
            case 0:
              return 'Offline';
            case 1:
              return 'Online';
            default:
              return '';
          }
        }
      },
      title: {
        text: values.unit || ''
      },
      _type: metric_cap + v_empty(' (%s)', values.unit),
    }],
    tooltip: {
      useHTML: true,
      shared:
        true,
      split:
        true,
      outside:
        true,
      backgroundColor:
        'white',
      positioner:

        function (width, height, point) {
          let point_pos = point.plotX + this.chart.plotLeft - width / 2;
          let max_right = this.chart.chartWidth - width / 2 - this.chart.marginRight;

          if (point.isHeader) {
            return {
              x: Math.max(0, Math.min(point_pos, max_right)),
              y: this.chart.chartHeight
            };
          } else {
            return {
              x: Math.max(0, Math.min(point_pos, max_right)),
              y: 0
            };
          }
        }

      ,
      formatter: status_tooltip_formatter
    }
    ,
    legend: {
      enabled: true
    }
    ,
    series: [{
      name: metric_cap + v_empty(' (%s)', values.unit),
      data: data,
      unit: values.unit
    }]
  }))
  ;
}

function markPercentile(data, p5, p25, p50, p75, p95) {
  let p5s = 0;
  let p25s = 0;
  let p50s = 0;
  let p75s = 0;
  let p95s = 0;

  for (let index = 0; index < data.length; ++index) {
    let entry = data[index];
    if (entry[0] === p5 && p5s < 1) {
      data[index] = {
        x: entry[0],
        y: entry[1],
        description: '5th percentile',
        marker: {enabled: true, fillColor: perfect}
      };
      p5s += 1;
    }
    if (entry[0] === p25 && p25s < 1) {
      data[index] = {
        x: entry[0],
        y: entry[1],
        description: '25th percentile',
        marker: {enabled: true, fillColor: good}
      };
      p25s += 1;
    }
    if (entry[0] === p50 && p50s < 1) {
      data[index] = {
        x: entry[0],
        y: entry[1],
        description: '50th percentile',
        marker: {enabled: true, fillColor: okay}
      };
      p50s += 1;
    }
    if (entry[0] === p75 && p75s < 1) {
      data[index] = {
        x: entry[0],
        y: entry[1],
        description: '75th percentile',
        marker: {enabled: true, fillColor: worry}
      };
      p75s += 1;
    }
    if (entry[0] === p95 && p95s < 1) {
      data[index] = {
        x: entry[0],
        y: entry[1],
        description: '95th percentile',
        marker: {enabled: true, fillColor: bad}
      };
      p95s += 1;
    }

    if (p5s >= 1 && p25s >= 1 && p50s >= 1 && p75s >= 1 && p95s >= 1)
      break;
  }
  return data;
}

function markMinMax(data, min, max) {
  let mins = 0;
  let maxs = 0;

  for (let index = 0; index < data.length; ++index) {
    let entry = data[index];
    if (entry[1] === max && maxs < 1) {
      data[index] = {
        x: entry[0],
        y: entry[1],
        description: 'Maximum',
        marker: {enabled: true, fillColor: 'red'}
      };
      maxs += 1;
    }
    if (entry[1] === min && mins < 1) {
      data[index] = {
        x: entry[0],
        y: entry[1],
        description: 'Minimum',
        marker: {enabled: true, fillColor: 'green'}
      };
      mins += 1;
    }

    if (mins >= 1 && maxs >= 1)
      break;
  }
  return data;
}

function markStatusChange(data) {
  let last = data[0];
  for (let index = 0; index < data.length; ++index) {
    let entry = data[index];
    if (entry['y'] < last['y']) {
      data[index] = {
        x: entry['x'],
        y: entry['y'],
        description: entry['description'],
        markerText: 'Incident',
        marker: {enabled: true, fillColor: 'red'}
      };
    } else if (entry['description'] === 'Offline') {
      data[index] = {
        x: entry['x'],
        y: entry['y'],
        description: entry['description'],
        markerText: '',
        marker: {enabled: false, fillColor: 'red'}
      };
    } else {
      data[index] = {
        x: entry['x'],
        y: entry['y'],
        description: entry['description'],
        markerText: '',
        marker: {enabled: false, fillColor: 'green'}
      };
    }
    last = entry;
  }
  return data;
}

function base_tooltip_formatter() {
  let p = this.points[0];
  let color = p.series.color;
  let unit = p.series.options.unit;
  let description = p.point.description === undefined ? '' :
    br(c(b(p.point.description), p.point.marker.fillColor));

  let span = description + '<span style="color:' + color + '">●</span> ';
  let header = '';

  if (p.series._i === 0) {
    header = b(time(this.x, 'Date: %d.%m.%Y<br>Time: %H:%M:%S.%f'));
  } else if (p.series._i === 1) {
    header = b(this.x + ' ' + unit);
  }

  return [header].concat(
    this.points.map(function (point) {
      if (point.series._i === 0) {
        let val = padT(dec(point.y));
        return span + b(val + ' ' + unit);
      } else if (point.series._i === 1) {
        let percentile = v_index(point.y);
        return span + percentile + ' percentile';
      }
    })
  );
}

function base_tooltip_formatter_compare() {
  let p = this.points[0];
  let color = p.series.color;
  let unit = p.series.options.unit;
  let description = p.point.description === undefined ? '' :
    br(c(b(p.point.description), p.point.marker.fillColor));

  let span = description + '<span style="color:' + color + '">●</span> ';

  return [b(better_duration(this.x))].concat(
    this.points.map(function (point) {
      let val = padT(dec(point.y));
      return span + b(val + ' ' + unit);
    })
  );
}

function status_tooltip_formatter() {
  let p = this.points[0];

  let description = p.point.description;
  let additional = p.point.markerText === (undefined || '') ? '' :
    br(c(b(p.point.markerText), p.point.marker.fillColor)) + '<br>';

  let header = b(time(this.x, 'Date: %d.%m.%Y<br>Time: %H:%M:%S.%f'));

  return [header].concat(
    this.points.map(function (point) {
      return additional + 'Status: ' + c(b(description), p.point.marker.fillColor);
    })
  );
}
