import planet from '../../assets/planet.gif';

class Statistic {
  constructor(globalData) {
    this.globalData = globalData;
  }

  showInfo(country = null, amountValue = 'total', measureValue = 'absolute') {
    let data = this.globalData;

    let pick = 'global';
    let label = `Global statistic`;
    // const gif = planet;
    let flag = `<img class = 'country-info-flag' src = '${planet}'></img>`;
    if (country) {
      pick = 'country';
      label = country.countryName;
      data = country;
      flag = `<img class = 'country-info-flag' src = '${country.countryFlag}'></img>`;
    }

    let coefficient = 1;
    if (measureValue !== 'absolute') {
      coefficient = 100000 / data.population;
    }

    let time = '';
    let timePrefics = '';
    if (amountValue === 'new') {
      time = 'Today';
      timePrefics = '+';
    }

    console.log(data);
    // check api for new cases

    const info = document.createElement('div');
    info.classList.add('statistic-info');

    info.innerHTML = `<div><h1>${label}</h1>
      <p>Cases: ${timePrefics} ${Math.trunc(coefficient * data[`${pick}Cases${time}`])}</p>
      <p>Deaths: ${timePrefics} ${Math.trunc(coefficient * data[`${pick}Deaths${time}`])}</p>
      <p>Recovered: ${timePrefics} ${Math.trunc(
      coefficient * data[`${pick}Recovered${time}`]
    )}</p></div>${flag}`;
    return info;
  }
}

export default Statistic;
