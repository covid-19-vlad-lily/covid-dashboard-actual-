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

    it('should always return 1 if the absolute measure passed', () => {
      expect(getCoefficient('absolute', data)).to.be.equal(1);
      expect(getCoefficient('absolute')).to.be.equal(1);
      expect(getCoefficient('absolute', 'lalala')).to.be.equal(1);
    });

    it('should return coefficient with calculations', () => {
      expect(getCoefficient('mew', data)).to.be.equal(0.5);
      expect(getCoefficient(15, data)).to.be.equal(0.5);
      expect(getCoefficient('absolut', { population: 0 })).to.be.equal(Infinity);
      expect(getCoefficient(NaN, { population: '0' })).to.be.equal(Infinity);
      expect(getCoefficient(null, { population: null })).to.be.equal(Infinity);
      expect(getCoefficient(true, { population: Infinity })).to.be.equal(0);
    });

    it('should throw an error whithout args', () => {
      expect(getCoefficient.bind(null, data)).to.throw(Error);
      expect(getCoefficient.bind(null, 'asd')).to.throw(Error);
      expect(getCoefficient.bind(null, 15, null)).to.throw(Error);
      expect(getCoefficient.bind(null, null)).to.throw(Error);
      expect(getCoefficient.bind(null, null, null)).to.throw(Error);
      expect(getCoefficient.bind(null, null, null, null)).to.throw(Error);
    });
  });

  describe('getTimeData', () => {
    const amountNew = getTimeData('new');
    const amountMew = getTimeData('mew');
    const withoutArgs = getTimeData();

    it('returnable object should be with "time" and "timeRrefics" properties', () => {
      expect(typeof amountNew).to.be.equal('object');
      expect(amountNew).to.have.all.keys('time', 'timePrefics');
      expect(amountMew).to.have.all.keys('time', 'timePrefics');
      expect(withoutArgs).to.have.all.keys('time', 'timePrefics');
    });
  });

  describe('getPickLabelDataFlag', () => {
    const someCountry = {
      countryName: 'Belarus',
      countryFlag: 'white-red-white',
    };

    const statistic = {
      globalData: 'World',
    };

    const emptyObj = {};

    let Belarus = null;
    let World = null;
    let emptyObjArgs = null;

    beforeEach(() => {
      Belarus = getPickLabelDataFlag(someCountry, statistic);
      World = getPickLabelDataFlag(null, statistic);
      emptyObjArgs = getPickLabelDataFlag(emptyObj, emptyObj);
    });

    it('returnable country data should be with "pick", "label", "data" and "flag" properties', () => {
      expect(typeof Belarus).to.be.equal('object');
      expect(Belarus).to.have.all.keys('pick', 'label', 'data', 'flag');
    });

    it('returnable world data should be with "pick", "label", "data" and "flag" properties', () => {
      expect(typeof World).to.be.equal('object');
      expect(World).to.have.all.keys('pick', 'label', 'data', 'flag');
    });

    it('should return incorrect data with "pick", "label", "data" and "flag" properties', () => {
      expect(typeof emptyObjArgs).to.be.equal('object');
      expect(emptyObjArgs).to.have.all.keys('pick', 'label', 'data', 'flag');
    });

    it('should throw an error without args', () => {
      expect(getPickLabelDataFlag.bind(null, null, null)).to.throw(Error);
      expect(getPickLabelDataFlag.bind(null, someCountry, null)).to.throw(Error);
    });
  });

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

    it('should throw an error because of incorrect args', () => {
      expect(getFilters.bind(null, 15)).to.throw(Error);
      expect(getFilters.bind(null, false)).to.throw(Error);
      expect(getFilters.bind(null, {})).to.throw(Error);
      expect(getFilters.bind(null, NaN)).to.throw(Error);
      expect(getFilters.bind(null, undefined)).to.throw(Error);
    });
  });

  describe('changeChartConfig', () => {
    const countryDataForChart = {
      timeline: { cases: {}, deaths: {}, recovered: {} },
      country: 'Belarus',
    };
    const worldDataForChart = { cases: {}, deaths: {}, recovered: {} };

    let worldData = null;
    let countryData = null;

    beforeEach(() => {
      worldData = changeChartConfig(worldDataForChart, null, 'cases', 'world');
      countryData = changeChartConfig(worldDataForChart, countryDataForChart, 'deaths', 'mew');
    });

    it('should return World data with "chartLabel", "commonData" and "color" properties', () => {
      expect(typeof worldData).to.be.equal('object');
      expect(worldData).to.have.all.keys('chartLabel', 'commonData', 'color');
    });

    it('should return Country data with "chartLabel", "commonData" and "color" properties', () => {
      expect(typeof countryData).to.be.equal('object');
      expect(countryData).to.have.all.keys('chartLabel', 'commonData', 'color');
    });

    it('should throw an error whithout args', () => {
      expect(changeChartConfig.bind(null)).to.throw(Error);
      expect(changeChartConfig.bind(null, null, countryDataForChart, 'deaths', 'mew')).to.throw(
        Error
      );
    });
  });
});
