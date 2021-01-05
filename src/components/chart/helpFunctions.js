export function getFilters(convertingMark) {
  let markCases = convertingMark.toLowerCase();
  if (convertingMark.toLowerCase() === 'confirmed') {
    markCases = 'cases';
  }
  return markCases;
}

export function changeChartConfig(worldDataForChart, countryDataForChart, mark, code) {
  let chartLabel = 'Global statistic';
  let commonData = worldDataForChart[mark];
  let color = '#296d15be';
  if (code !== 'world') {
    commonData = countryDataForChart.timeline[mark];
    chartLabel = `${countryDataForChart.country} statistic`;
    color = 'red';
  }
  return { commonData, chartLabel, color };
}

export function changeAmountAndMeasure(commonDataF, chartStatistic, amount, measure) {
  let reduced = Object.values(commonDataF);

  if (amount === 'new') {
    reduced = reduced.reduce((acc, cur, i) => {
      let pushToAcc = cur - Object.values(commonDataF)[i - 1] || 0;
      if (pushToAcc < 0) pushToAcc = 0;
      acc.push(pushToAcc);
      return acc;
    }, []);
    return reduced;
  }

  if (measure === 'per-one-hundred') {
    reduced = reduced.reduce((acc, cur) => {
      const pushToAcc = (cur / chartStatistic.population) * 100000;
      acc.push(pushToAcc);
      return acc;
    }, []);
  }
  return reduced;
}
