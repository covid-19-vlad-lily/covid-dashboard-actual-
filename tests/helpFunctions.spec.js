import { expect } from 'chai';

// import {
//   getFilters,
//   changeChartConfig,
//   changeAmountAndMeasure,
// } from '../src/components/chart/helpFunctions';
import {
  getPickLabelDataFlag,
  getCoefficient,
  getTimeData,
} from '../src/components/statistic/helpFunctions';

describe('helpFunctions', () => {
  describe('getCoefficient', () => {
    const data = {
      population: 200000,
    };

    it('should get converted global countries data', () => {
      expect(getCoefficient('absolute', data)).to.be.equal(1);
    });
  });
});
