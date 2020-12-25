class Table {
  constructor(countriesData, globalData) {
    this.countriesData = countriesData;
    this.globalData = globalData;
    this.tables = [];
  }

  createTables() {
    const fragment = document.createDocumentFragment();
    fragment.append(
      this.createTable('Cases'),
      this.createTable('Deaths'),
      this.createTable('Recovered')
    );
    return fragment;
  }

  sortData(string) {
    this.countriesData = this.countriesData.sort((a, b) => b[string] - a[string]);
  }

  createTable(mark) {
    this.sortData(`country${mark}`);
    const wrapperTableWrapper = document.createElement('div');
    const tableNameAndExpandBtn = document.createElement('div');
    const tableName = document.createElement('h1');
    const expandBtn = document.createElement('button');
    const inputDescriptionAndInput = document.createElement('div');
    const inputDescription = document.createElement('p');
    const input = document.createElement('input');

    tableNameAndExpandBtn.classList.add('tbl-name-expnd-btn');
    expandBtn.classList.add('expand-btn');
    inputDescriptionAndInput.classList.add('input-i-descr');

    const GLOBAL_MARK_DATA = `global${mark}`;

    tableName.textContent = `${mark}: ${this.globalData[GLOBAL_MARK_DATA]}`;
    expandBtn.textContent = 'Expand';
    inputDescription.textContent = 'Input country name: ';

    tableNameAndExpandBtn.append(tableName, expandBtn);
    inputDescriptionAndInput.append(inputDescription, input);

    const tableWrapper = document.createElement('div');
    const table = document.createElement('table');

    wrapperTableWrapper.classList.add('wrapper-table-wrapper');
    tableWrapper.classList.add('table-wrapper');
    table.classList.add('table');

    this.tables.push(table);

    wrapperTableWrapper.append(tableNameAndExpandBtn, inputDescriptionAndInput, tableWrapper);
    tableWrapper.append(table);

    this.countriesData.forEach((countryData) => {
      const countryItem = document.createElement('tr');
      const countryInfo = document.createElement('td');
      const countryFlag = document.createElement('img');
      const countryName = document.createElement('span');
      const countryDataCases = document.createElement('td');
      const btnTd = document.createElement('td');
      const pickCountryBtn = document.createElement('button');

      countryFlag.classList.add('country-flag');
      pickCountryBtn.classList.add('pick-country-btn');

      countryInfo.append(countryFlag, countryName);
      btnTd.appendChild(pickCountryBtn);

      countryFlag.src = countryData.countryFlag;
      countryName.textContent = countryData.countryName;
      countryDataCases.textContent = countryData[`country${mark}`];
      pickCountryBtn.textContent = 'Pick this country';

      countryItem.append(countryDataCases, countryInfo, btnTd);
      table.appendChild(countryItem);
    });
    return wrapperTableWrapper;
  }
}

export default Table;
