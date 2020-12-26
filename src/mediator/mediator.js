import { getGlobalCountriesData, getGlobalData, getWorldDataForChart } from '../services/api';
import Table from '../components/table';
import ChartStatistic from '../components/chart';
import Map from '../components/map';

class Mediator {
  constructor() {
    this.createPage();
  }

  createPage() {
    // --------filtres
    const amountDiv = document.createElement('div');
    amountDiv.textContent = 'Amount: ';
    this.amount = document.createElement('select');
    this.amount.classList.add('amount');
    this.amount.innerHTML =
      `${'<option value="total">Total</option>'}` + `${'<option value="new">New</option>'}`;
    const measureDiv = document.createElement('div');
    measureDiv.textContent = 'Measure: ';
    this.measure = document.createElement('select');
    this.measure.classList.add('measure');
    this.measure.innerHTML =
      `${'<option value="absolute">Absolute</option>'}` +
      `${'<option value="per-one-hundred">Per 100.000</option>'}`;
    const markDiv = document.createElement('div');
    markDiv.textContent = 'Mark: ';
    this.mark = document.createElement('select');
    this.mark.classList.add('mark');
    this.mark.innerHTML =
      `${'<option value="Confirmed">Confirmed</option>'}` +
      `${'<option value="Deaths">Deaths</option>'}` +
      `${'<option value="Recovered">Recovered</option>'}`;
    const recetBtn = document.createElement('button');
    recetBtn.textContent = 'Reset picked country';
    recetBtn.classList.add('recet-btn');

    amountDiv.appendChild(this.amount);
    measureDiv.appendChild(this.measure);
    markDiv.appendChild(this.mark);

    this.filters = document.createElement('div');
    this.filters.classList.add('filters');
    this.filters.append(amountDiv, measureDiv, markDiv, recetBtn);

    const hr = document.createElement('hr');
    // --------tables
    this.tables = document.createElement('div');
    this.tables.classList.add('tables');
    // --------chart data map
    this.chartDataAndMap = document.createElement('div');
    this.chartDataAndMap.classList.add('chart-data-map');
    // chart block
    const chartWrapper = document.createElement('div');
    const expandBtn = document.createElement('button');
    expandBtn.textContent = 'Expand';
    chartWrapper.classList.add('chart-wrapper');
    expandBtn.classList.add('expand-btn');

    this.chartCanvas = document.createElement('canvas');
    chartWrapper.append(expandBtn, this.chartCanvas);
    // data block
    this.statisticData = document.createElement('div');
    this.statisticData.classList.add('statistic-data');
    this.statisticData.appendChild(expandBtn.cloneNode(true));
    // map block
    this.mapStatistic = document.createElement('div');
    this.mapStatistic.classList.add('map-statistic');
    this.mapStatistic.appendChild(expandBtn.cloneNode(true));

    this.chartDataAndMap.append(chartWrapper, this.statisticData, this.mapStatistic);
    // --------footer
    const footer = document.createElement('footer');
    const footerInfo = document.createElement('div');
    footerInfo.classList.add('footer-info');
    const vladGitLink = document.createElement('a');
    const lilyGitLink = document.createElement('a');
    const year = document.createElement('span');
    const rsLink = document.createElement('a');
    const rsLogo = document.createElement('img');
    rsLogo.classList.add('rs-logo');

    rsLogo.src = 'somewhere with Jesus'; //I don't know, or I'm crazy or I need to sleep more

    rsLink.appendChild(rsLogo);
    vladGitLink.href = 'https://github.com/VladislavLuksha';
    vladGitLink.textContent = 'VladislavLuksha';
    lilyGitLink.href = 'https://github.com/lilianna040';
    lilyGitLink.textContent = 'lilianna040';
    year.textContent = '2020';
    rsLink.href = 'https://rs.school/js/';

    footerInfo.append(vladGitLink, lilyGitLink, year, rsLink);
    footer.append(footerInfo);

    // ну наканецта
    document.body.append(
      this.filters,
      hr,
      this.tables,
      hr.cloneNode(),
      this.chartDataAndMap,
      hr.cloneNode(),
      footer
    );
  }

  loadData() {
    Promise.all([getGlobalCountriesData(), getGlobalData(), getWorldDataForChart()]).then(
      ([globalCountriesData, globalData, worldDataForChart]) => {
        this.globalCountriesData = globalCountriesData;
        this.globalData = globalData;
        this.worldDataForChart = worldDataForChart;
        this.createComponents();
      }
    );
  }

  createComponents() {
    this.tableCases = new Table(this.globalCountriesData, this.globalData);
    this.tables.appendChild(this.tableCases.createTables());
    this.chartStatistic = new ChartStatistic(this.chartCanvas, this.worldDataForChart);
    this.chartStatistic.drawChart();
  }
}

export default Mediator;
