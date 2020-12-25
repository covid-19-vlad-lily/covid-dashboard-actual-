import { getGlobalCountriesData, getGlobalData } from '../services/api';
import Table from '../components/table';
import Chart from '../components/chart';
import Map from '../components/map';

class Mediator {
  constructor() {
    this.createPage();
  }

  createPage() {
    this.filters = document.createElement('div');
    this.filters.classList.add('filters');
    const hr = document.createElement('hr');
    this.tables = document.createElement('div');
    this.tables.classList.add('tables');
    this.info = document.createElement('div');
    this.info.classList.add('info');
    const footer = document.createElement('footer');
    const footerInfo = document.createElement('div');
    footer.append(footerInfo);

    document.body.append(
      this.filters,
      hr,
      this.tables,
      hr.cloneNode(),
      this.info,
      hr.cloneNode(),
      footer
    );
  }

  loadData() {
    Promise.all([getGlobalCountriesData(), getGlobalData()]).then(
      ([globalCountriesData, globalData]) => {
        this.globalCountriesData = globalCountriesData;
        this.globalData = globalData;
        this.createComponents();
      }
    );
  }

  createComponents() {
    this.tableCases = new Table(this.globalCountriesData, this.globalData);
    this.tables.appendChild(this.tableCases.createTables());
  }
}

export default Mediator;
