export function extractAxiosData(axiosResponse) {
  return axiosResponse.data;
}

export function convertGlobalCountriesData(globalCountriesData) {
  return globalCountriesData.map((globalCountryData) => ({
    countryName: globalCountryData.country,
    countryCode: globalCountryData.countryInfo.iso2,
    countryFlag: globalCountryData.countryInfo.flag,
    countryCases: globalCountryData.cases,
    countryDeaths: globalCountryData.deaths,
    countryRecovered: globalCountryData.recovered,
    countryCasesToday: globalCountryData.todayCases,
    countryDeathsToday: globalCountryData.todayDeaths,
    countryRecoveredToday: globalCountryData.todayRecovered,
    countryCasesPerHundred: Math.trunc(globalCountryData.casesPerOneMillion / 10),
    countryDeathsPerHundred: Math.trunc(globalCountryData.deathsPerOneMillion / 10),
    countryRecoveredPerHundred: Math.trunc(globalCountryData.recoveredPerOneMillion / 10),
    population: globalCountryData.population,
  }));
}

export function convertGlobalData(globalData) {
  return {
    globalCases: globalData.cases,
    globalDeaths: globalData.deaths,
    globalRecovered: globalData.recovered,
    globalCasesToday: globalData.todayCases,
    globalDeathsToday: globalData.todayDeaths,
    globalRecoveredToday: globalData.todayRecovered,
    globalCasesPerHundred: Math.trunc(globalData.casesPerOneMillion / 10),
    globalDeathsPerHundred: Math.trunc(globalData.deathsPerOneMillion / 10),
    globalRecoveredPerHundred: Math.trunc(globalData.recoveredPerOneMillion / 10),
    population: globalData.population,
  };
}
