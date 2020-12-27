import filterCountry from './helper';

class Table {
  constructor(countriesData, globalData) {
    this.countriesData = countriesData;
    this.globalData = globalData;
    this.tables = [];
    this.inputs = [];
  }

  createTables(amountValue = 'total', measureValue = 'absolute') {
    this.amount = amountValue;
    this.measure = measureValue;
    this.postfix = '';
    if (amountValue === 'new') {
      this.postfix = 'Today';
    }
    this.coefficient = 1;
    const fragment = document.createDocumentFragment();
    fragment.append(
      this.createTable('Cases'),
      this.createTable('Deaths'),
      this.createTable('Recovered')
    );
    return fragment;
  }

  sortData(string, mark) {
    this.copyData = JSON.parse(JSON.stringify(this.countriesData));
    if (this.measure !== 'absolute') {
      this.copyData = this.copyData.reduce((acc, cur) => {
        const lol = cur;
        const measure = cur[`country${mark}${this.postfix}`];
        const population = cur.population || 100000;
        lol[`country${mark}${this.postfix}`] = Math.trunc((measure * 100000) / population);
        acc.push(lol);
        return acc;
      }, []);
    }
    this.copyData = this.copyData.sort((a, b) => b[string] - a[string]);
  }

  createTable(mark) {
    this.sortData(`country${mark}${this.postfix}`, mark);
    const wrapperTableWrapper = document.createElement('div');
    const tableNameAndExpandBtn = document.createElement('div');
    const tableName = document.createElement('h1');
    const expandBtn = document.createElement('button');
    const inputDescriptionAndInput = document.createElement('div');
    const inputDescription = document.createElement('p');
    const input = document.createElement('input');
    input.addEventListener('input', filterCountry);

    tableNameAndExpandBtn.classList.add('tbl-name-expnd-btn');
    expandBtn.classList.add('expand-btn');
    inputDescriptionAndInput.classList.add('input-i-descr');

    const GLOBAL_MARK_DATA = `global${mark}${this.postfix}`;

    if (this.measure !== 'absolute') {
      this.coefficient = 1 / 78000;
    }

    tableName.textContent = `${mark} ${this.postfix}: ${Math.trunc(
      this.coefficient * this.globalData[GLOBAL_MARK_DATA]
    )}`;
    expandBtn.textContent = 'Expand';
    inputDescription.textContent = 'Input country name: ';

    tableNameAndExpandBtn.append(tableName, expandBtn);
    inputDescriptionAndInput.append(inputDescription, input);

    const tableWrapper = document.createElement('div');
    const table = document.createElement('table');

    wrapperTableWrapper.classList.add('wrapper-table-wrapper');
    wrapperTableWrapper.classList.add('wrapper-expand');
    tableWrapper.classList.add('table-wrapper');
    table.classList.add('table');

    this.tables.push(table);

    wrapperTableWrapper.append(tableNameAndExpandBtn, inputDescriptionAndInput, tableWrapper);
    tableWrapper.append(table);

    this.copyData.forEach((countryData) => {
      const countryItem = document.createElement('tr');
      const countryInfo = document.createElement('td');
      const countryFlag = document.createElement('img');
      const countryName = document.createElement('span');
      const countryDataCases = document.createElement('td');
      const btnTd = document.createElement('td');
      const pickCountryBtn = document.createElement('button');

      countryItem.setAttribute('data-name', countryData.countryName);

      countryFlag.classList.add('country-flag');
      pickCountryBtn.classList.add('pick-country-btn');
      pickCountryBtn.setAttribute('data-code', countryData.countryCode);

      countryInfo.append(countryFlag, countryName);
      btnTd.appendChild(pickCountryBtn);

      countryFlag.src = countryData.countryFlag;
      countryName.textContent = countryData.countryName;
      countryDataCases.textContent = countryData[`country${mark}${this.postfix}`];
      pickCountryBtn.textContent = 'Pick this country';

      countryItem.append(countryDataCases, countryInfo, btnTd);
      table.appendChild(countryItem);
    });
    return wrapperTableWrapper;
  }
}

export default Table;
