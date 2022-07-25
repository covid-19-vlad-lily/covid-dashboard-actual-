import {
  getGlobalCountriesData,
  getGlobalData,
  getWorldDataForChart,
  getCountryDataForChart,
} from '../services/api';
import { LILY_GIT, VLAD_GIT, RS_LINK } from '../constants/footer.constants';
import Table from '../components/table';
import ChartStatistic from '../components/chart';
import Statistic from '../components/statistic';
// import Map from '../components/map';
import RsLogo from '../assets/rsLogo.svg';

class Mediator {
  constructor() {
    this.amountValue = 'total';
    this.measureValue = 'absolute';
    this.pickValue = 'world';
    this.markValue = 'cases';
    this.createPage();
  }

  createPage() {
    // --------filtres
    this.appWrapper = document.createElement('div');
    this.appWrapper.classList.add('app-light-theme');

    const covid19 = document.createElement('h1');
    covid19.textContent = 'COVID-19 DASHBOARD ';

    const darkThemeBtn = document.createElement('input');
    darkThemeBtn.classList.add('dark-theme');
    darkThemeBtn.type = 'checkbox';
    covid19.classList.add('covid-logo');

    covid19.appendChild(darkThemeBtn);

    const amountDiv = document.createElement('div');
    amountDiv.textContent = 'Amount: ';
    this.amount = document.createElement('select');
    this.amount.classList.add('amount');
    this.amount.innerHTML = `<option value="total">Total</option>
      <option value="new">New</option>`;
    const measureDiv = document.createElement('div');
    measureDiv.textContent = 'Measure: ';
    this.measure = document.createElement('select');
    this.measure.classList.add('measure');
    this.measure.innerHTML = `<option value="absolute">Absolute</option>
      <option value="per-one-hundred">Per 100.000</option>`;
    const markDiv = document.createElement('div');
    markDiv.textContent = 'Mark: ';
    this.mark = document.createElement('select');
    this.mark.classList.add('mark');
    this.mark.innerHTML = `<option value="Confirmed">Confirmed</option>
      <option value="Deaths">Deaths</option>
      <option value="Recovered">Recovered</option>`;
    this.recetBtn = document.createElement('button');
    this.recetBtn.textContent = 'Reset picked country';
    this.recetBtn.classList.add('recet-btn');

    amountDiv.appendChild(this.amount);
    measureDiv.appendChild(this.measure);
    markDiv.appendChild(this.mark);

    this.filters = document.createElement('div');
    this.filters.classList.add('filters');
    this.filters.append(covid19, amountDiv, measureDiv, markDiv, this.recetBtn);

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
    chartWrapper.classList.add('chart-wrapper', 'wrapper-expand');
    expandBtn.classList.add('expand-btn');

    this.chartCanvas = document.createElement('canvas');
    chartWrapper.append(expandBtn, this.chartCanvas);
    // data block 'last data update'
    this.statisticData = document.createElement('div');
    this.statisticData.classList.add('statistic-data', 'wrapper-expand');
    this.statisticData.appendChild(expandBtn.cloneNode(true));
    // map block
    this.mapStatistic = document.createElement('div');
    this.mapStatistic.classList.add('map-statistic', 'wrapper-expand');
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

    rsLogo.src = RsLogo;

    // rsLogo.src = 'somewhere with Jesus'; //I don't know, or I'm crazy or I need to sleep more

    rsLink.appendChild(rsLogo);
    vladGitLink.href = LILY_GIT;
    lilyGitLink.href = VLAD_GIT;
    lilyGitLink.textContent = 'lilianna040';
    year.textContent = '2020';
    rsLink.href = RS_LINK;

    footerInfo.append(lilyGitLink, year, rsLink);
    footer.append(footerInfo);

    // ну наканецта
    this.appWrapper.append(this.filters, this.tables, this.chartDataAndMap, footer);
    document.body.appendChild(this.appWrapper);

    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('dark-theme')) {
        this.appWrapper.classList.toggle('app-dark-theme');
        document.body.classList.toggle('dark-scrollbar');
      }
    });

    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('expand-btn')) {
        // event.target.closest('.wrapper-expand').classList.toggle('expand');
        // if (!document.body.classList.contains('body-expand')) {
        //   this.oldY = window.scrollY;
        //   window.scrollTo(0, 0);
        // } else {
        //   window.scrollTo(0, this.oldY || 0);
        // }
        // document.body.classList.toggle('body-expand');

        event.target.closest('.wrapper-expand').style.background = 'white'; // попробуй закомментировать эту линию
        event.target.closest('.wrapper-expand').requestFullscreen();
      }
    });
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
    this.statistic = new Statistic(this.globalData, this.worldDataForChart);
    this.statisticData.appendChild(this.statistic.showInfo());
    this.listenFilters();
    this.listenCountries();
  }

  listenFilters() {
    this.amount.addEventListener('click', this.changeAmount.bind(this));
    this.measure.addEventListener('click', this.changeMeasure.bind(this));
    this.mark.addEventListener('click', this.changeMark.bind(this));
    this.recetBtn.addEventListener('click', this.resetToGlobal.bind(this));
  }

  changeAmount(event) {
    this.amountValue = event.target.value;
    this.redrawChart();
    this.redrawInfo();
    this.redrawTables();
    // this.redrowMap();
  }

  changeMeasure(event) {
    this.measureValue = event.target.value;
    this.redrawChart();
    this.redrawInfo();
    this.redrawTables();
  }

  changeMark(event) {
    this.markValue = event.target.value;
    this.redrawChart();
  }

  listenCountries() {
    this.tables.addEventListener('click', this.pickCountry.bind(this));
  }

  async pickCountry(event) {
    const countryCode = event.target.getAttribute('data-code');
    if (countryCode) {
      this.currentDataForChart = await getCountryDataForChart(countryCode);

      let population;
      this.globalCountriesData.forEach((country) => {
        if (country.countryCode === countryCode) {
          population = country.population;
          this.pickedCountry = country;
        }
      });

      this.chartStatistic.setCountry(this.currentDataForChart, population);
      this.pickValue = countryCode;
      this.redrawChart();
      this.redrawInfo();
    }
  }

  resetToGlobal() {
    this.pickValue = 'world';
    this.chartStatistic.setCountry(null, 7827000000);
    this.pickedCountry = null;
    this.redrawChart();
    this.redrawInfo();
  }

  redrawTables() {
    this.tables.innerHTML = '';
    this.tables.appendChild(this.tableCases.createTables(this.amountValue, this.measureValue));
  }

  redrawChart() {
    this.chartStatistic.drawChart(
      this.pickValue,
      this.amountValue,
      this.measureValue,
      this.markValue
    );
  }

  redrawInfo() {
    this.statisticData.lastChild.remove();
    this.statisticData.appendChild(
      this.statistic.showInfo(this.pickedCountry, this.amountValue, this.measureValue)
    );
  }
}

export default Mediator;
