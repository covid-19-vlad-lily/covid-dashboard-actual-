import Chart from 'chart.js';
import chartConfig from './chartConfig';
import { getFilters, changeChartConfig, changeAmountAndMeasure } from './helpFunctions';

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
    const markCases = getFilters(markValue);

    const { commonData, chartLabel, color } = changeChartConfig(
      this.worldDataForChart,
      this.countryDataForChart,
      markCases,
      countryCode
    );

    const reduced = changeAmountAndMeasure(commonData, this, amountValue, measureValue);

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
