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
    animation: {
      duration: 0,
    },
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
    this.canvas.height = 295;
    this.worldDataForChart = worldDataForChart;
    this.population = 7827000000;
  }

  drawChart(
    countryCode = 'world',
    amountValue = 'total',
    measureValue = 'absolute',
    markValue = 'cases'
  ) {
    let markCases = markValue.toLowerCase();
    if (markValue.toLowerCase() === 'confirmed') {
      markCases = 'cases';
    }

    let chartLabel = 'Global statistic';
    let commonData = this.worldDataForChart[markCases];
    let color = '#296d15be';
    if (countryCode !== 'world') {
      commonData = this.countryDataForChart.timeline[markCases];
      chartLabel = `${this.countryDataForChart.country} statistic`;
      color = 'red';
    }

    let reduced = Object.values(commonData);
    if (amountValue === 'new') {
      reduced = Object.values(commonData).reduce((acc, cur, i) => {
        let pushToAcc = cur - Object.values(commonData)[i - 1] || 0;
        if (pushToAcc < 0) pushToAcc = 0;
        acc.push(pushToAcc);
        return acc;
      }, []);
    }

    if (measureValue === 'per-one-hundred') {
      reduced = reduced.reduce((acc, cur) => {
        const pushToAcc = (cur / this.population) * 100000;
        acc.push(pushToAcc);
        return acc;
      }, []);
    }

    this.chart = new Chart(this.canvas, chartConfig);

    const timestamps = Object.keys(commonData);
    const days = reduced;

    chartConfig.data.labels = timestamps.map((time) => new Date(time));

    const newChart = {
      label: chartLabel,
      data: days,
      backgroundColor: color,
    };

    chartConfig.data.datasets = [];
    chartConfig.data.datasets.push(newChart);
    this.chart.update();
  }

  setCountry(countryData = this.worldDataForChart, population) {
    this.countryDataForChart = countryData;
    this.population = population;
  }
}

export default ChartStatistic;
