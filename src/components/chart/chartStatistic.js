import Chart from 'chart.js';

const chartConfig = {
  type: 'bar',
  data: {
    labels: [],
    datasets: [],
  },
  options: {
    responsive: true,
    devicePixelRatio: 2,
    maintainAspectRatio: true,
    tooltips: {
      intersect: false,
    },
    scales: {
      xAxes: [
        {
          type: 'time',
          distribution: 'series',
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

class ChartStatistic {
  constructor(canvas, worldDataForChart) {
    this.canvas = canvas;
    this.canvas.height = 300;
    this.worldDataForChart = worldDataForChart;
  }

  drawChart() {
    this.chart = new Chart(this.canvas, chartConfig);

    const timestamps = Object.keys(this.worldDataForChart.cases);
    const days = Object.values(this.worldDataForChart.cases);

    chartConfig.data.labels = timestamps.map((time) => new Date(time));

    const newChart = {
      label: 'Global statistic',
      data: days,
      backgroundColor: '#296d15be',
      // borderColor: '#000',
      // borderDash: [1, 2],
      // borderWidth: 0,
      // pointRadius: 2,
    };

    chartConfig.data.datasets = [];
    chartConfig.data.datasets.push(newChart);
    this.chart.update();

    // initChart() {
    //   const time = this.cutTimeline(timestamps);
    //   chartConfig.data.labels = time.reverse();
    //   const newCountry = this.updateChart('World');
    //   chartConfig.data.datasets.push(newCountry);
    //   this.chart.update();
    // }
  }
}

export default ChartStatistic;
