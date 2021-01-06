import { expect } from 'chai';
import {
  getPickLabelDataFlag,
  getCoefficient,
  getTimeData,
} from '../src/components/statistic/helpFunctions';
import { getFilters, changeChartConfig } from '../src/components/chart/helpFunctions';

describe('helpFunctions', () => {
  describe('getCoefficient', () => {
    const data = {
      population: 200000,
    };

    it('should return coefficient without calculations', () => {
      expect(getCoefficient('absolute', data)).to.be.equal(1);
      expect(getCoefficient('absolute')).to.be.equal(1);
      expect(getCoefficient('abso' + 'lute' + '', 'lalala')).to.be.equal(1);
    });

    it('should return coefficient with calculations', () => {
      expect(getCoefficient('mew', data)).to.be.equal(0.5);
      expect(getCoefficient(15, data)).to.be.equal(0.5);
      expect(getCoefficient('absolut', { population: 0 })).to.be.equal(Infinity);
      expect(getCoefficient(NaN, { population: '0' })).to.be.equal(Infinity);
      expect(getCoefficient(null, { population: null })).to.be.equal(Infinity);
      expect(getCoefficient(true, { population: Infinity })).to.be.equal(0);
    });

    it('should throw an error', () => {
      expect(getCoefficient.bind(null, data)).to.throw(Error);
      expect(getCoefficient.bind(null, 'asd')).to.throw(Error);
      expect(getCoefficient.bind(null, 15, null)).to.throw(Error);
      expect(getCoefficient.bind(null, null)).to.throw(Error);
      expect(getCoefficient.bind(null, null, null)).to.throw(Error);
      expect(getCoefficient.bind(null, null, null, null)).to.throw(Error);
    });
  });
});

describe('helpFunctions', () => {
  describe('getTimeData', () => {
    const amountNew = getTimeData('new');
    const amountMew = getTimeData('mew');
    const withoutArgs = getTimeData();

    it('should return object properties', () => {
      expect(typeof amountNew).to.be.equal('object');
      expect(amountNew.time).to.be.equal('Today');
      expect(amountNew.timePrefics).to.be.equal('+');
      expect(amountNew.lol).to.be.equal(undefined);
      expect(amountMew.time).to.be.equal('');
      expect(amountMew.timePrefics).to.be.equal('');
      expect(amountMew.lol).to.be.equal(undefined);
      expect(withoutArgs.time).to.be.equal('');
      expect(withoutArgs.timePrefics).to.be.equal('');
      expect(withoutArgs.lol).to.be.equal(undefined);
    });
  });
});

describe('helpFunctions', () => {
  describe('getPickLabelDataFlag', () => {
    const someCountry = {
      countryName: 'Belarus',
      countryFlag: 'white-red-white',
    };
    const statistic = {
      globalData: 'World',
    };
    const emptyObj = {};

    const Belarus = getPickLabelDataFlag(someCountry, statistic);
    const World = getPickLabelDataFlag(null, statistic);
    const emptyObjArgs = getPickLabelDataFlag(emptyObj, emptyObj);

    it('should return Belarus data', () => {
      expect(typeof Belarus).to.be.equal('object');
      expect(Belarus.lol).to.be.equal(undefined);
      expect(Belarus.pick).to.be.equal('country');
      expect(Belarus.label).to.be.equal('Belarus');
      expect(Belarus.data).to.be.equal(someCountry);
      expect(Belarus.flag).to.be.equal(
        `<img class = 'country-info-flag' src = 'white-red-white'></img>`
      );
    });

    it('should return World data', () => {
      expect(typeof World).to.be.equal('object');
      expect(World.lol).to.be.equal(undefined);
      expect(World.pick).to.be.equal('global');
      expect(World.label).to.be.equal('Global statistic');
      expect(World.data).to.be.equal(statistic.globalData);
      expect(World.flag).to.be.equal('');
    });

    it('should return incorrect data', () => {
      expect(typeof emptyObjArgs).to.be.equal('object');
      expect(emptyObjArgs.lol).to.be.equal(undefined);
      expect(emptyObjArgs.pick).to.be.equal('country');
      expect(emptyObjArgs.label).to.be.equal(undefined);
      expect(emptyObjArgs.data).to.be.equal(emptyObj);
      expect(emptyObjArgs.flag).to.be.equal(
        "<img class = 'country-info-flag' src = 'undefined'></img>"
      );
    });

    it('should throw an error whithout args', () => {
      expect(getPickLabelDataFlag.bind(null, null, null)).to.throw(Error);
      expect(getPickLabelDataFlag.bind(null, someCountry, null)).to.throw(Error);
    });
  });
});

describe('helpFunctions', () => {
  describe('getFilters', () => {
    it('should return "cases"', () => {
      expect(getFilters('Confirmed')).to.be.equal('cases');
      expect(getFilters('confirmed')).to.be.equal('cases');
    });

    it('should return mark', () => {
      expect(getFilters('Deaths')).to.be.equal('deaths');
      expect(getFilters('RECOVERED')).to.be.equal('recovered');
      expect(getFilters('Mew')).to.be.equal('mew');
      expect(getFilters('')).to.be.equal('');
      expect(getFilters('15')).to.be.equal('15');
    });

    it('should throw an error', () => {
      expect(getFilters.bind(null, 15)).to.throw(Error);
      expect(getFilters.bind(null, false)).to.throw(Error);
      expect(getFilters.bind(null, {})).to.throw(Error);
      expect(getFilters.bind(null, NaN)).to.throw(Error);
      expect(getFilters.bind(null, undefined)).to.throw(Error);
    });
  });
});

describe('helpFunctions', () => {
  describe('changeChartConfig', () => {
    const countryDataForChart = {
      timeline: { cases: {}, deaths: {}, recovered: {} },
      country: 'Belarus',
    };
    const worldDataForChart = { cases: {}, deaths: {}, recovered: {} };

    const worldData = changeChartConfig(worldDataForChart, null, 'cases', 'world');
    const countryData = changeChartConfig(worldDataForChart, countryDataForChart, 'deaths', 'mew');

    it('should return World data', () => {
      expect(typeof worldData).to.be.equal('object');
      expect(worldData.lol).to.be.equal(undefined);
      expect(worldData.chartLabel).to.be.equal('Global statistic');
      expect(worldData.commonData).to.be.equal(worldDataForChart.cases);
      expect(worldData.color).to.be.equal('#296d15be');
    });

    it('should return Country data', () => {
      expect(typeof countryData).to.be.equal('object');
      expect(countryData.lol).to.be.equal(undefined);
      expect(countryData.chartLabel).to.be.equal('Belarus statistic');
      expect(countryData.commonData).to.be.equal(countryDataForChart.timeline.deaths);
      expect(countryData.color).to.be.equal('red');
    });

    it('should throw an error whithout args', () => {
      expect(changeChartConfig.bind(null)).to.throw(Error);
      expect(changeChartConfig.bind(null, null, countryDataForChart, 'deaths', 'mew')).to.throw(
        Error
      );
    });
  });
});
