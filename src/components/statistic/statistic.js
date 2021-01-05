import { getPickLabelDataFlag, getCoefficient, getTimeData } from './helpFunctions';

class Statistic {
  constructor(globalData, worldDataForChart) {
    this.globalData = globalData;
    this.date = Object.keys(Object.values(worldDataForChart)[0]);
  }

  showInfo(country = null, amountValue = 'total', measureValue = 'absolute') {
    const { pick, label, data, flag } = getPickLabelDataFlag(country, this);

    const coefficient = getCoefficient(measureValue, data);

    const { time, timePrefics } = getTimeData(amountValue);

    const info = document.createElement('div');
    info.classList.add('statistic-info');

    info.innerHTML = `<div>Last data update: ${new Date(this.date[this.date.length - 1])}</div>
     <div><h1>${label}</h1>
      <p>Cases: ${timePrefics} ${Math.trunc(coefficient * data[`${pick}Cases${time}`])}</p>
      <p>Deaths: ${timePrefics} ${Math.trunc(coefficient * data[`${pick}Deaths${time}`])}</p>
      <p>Recovered: ${timePrefics} ${Math.trunc(
      coefficient * data[`${pick}Recovered${time}`]
    )}</p></div>${flag}`;
    return info;
  }
}

export default Statistic;
