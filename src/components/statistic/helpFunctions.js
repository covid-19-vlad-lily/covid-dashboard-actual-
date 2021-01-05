import planet from '../../assets/planet.gif';

export function getPickLabelDataFlag(someCountry, statistic) {
  let data = statistic.globalData;

  let pick = 'global';
  let label = `Global statistic`;

  let flag = `<img class = 'country-info-flag' src = '${planet}'></img>`;
  if (someCountry) {
    pick = 'country';
    label = someCountry.countryName;
    data = someCountry;
    flag = `<img class = 'country-info-flag' src = '${someCountry.countryFlag}'></img>`;
  }
  return { pick, label, data, flag };
}

export function getCoefficient(measure, data) {
  console.log(data);
  let coefficient = 1;
  if (measure !== 'absolute') {
    coefficient = 100000 / data.population;
  }
  return coefficient;
}

export function getTimeData(amount) {
  let time = '';
  let timePrefics = '';
  if (amount === 'new') {
    time = 'Today';
    timePrefics = '+';
  }
  return { time, timePrefics };
}
