
import Chart from 'chart.js';

const chartConfig = {
  type: 'line',
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    devicePixelRatio: 2,
    maintainAspectRatio: true,
    tooltips: {
      intersect: false,
    },
    scales: {
      xAxes: [{
        type: 'time',
        distribution: 'series',
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
      }],
    },
  },
};

class Chart {
  constructor() {

  }
}

export default Chart;
