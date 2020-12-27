import axios from 'axios';

import { extractAxiosData, convertGlobalCountriesData, convertGlobalData } from '../utils';

export function getGlobalCountriesData() {
  return axios('https://corona.lmao.ninja/v2/countries')
    .then(extractAxiosData)
    .then((globalCountriesData) => convertGlobalCountriesData(globalCountriesData));
}

export function getGlobalData() {
  return axios('https://corona.lmao.ninja/v2/all')
    .then(extractAxiosData)
    .then((globalData) => convertGlobalData(globalData));
}

export function getWorldDataForChart() {
  return axios('https://disease.sh/v3/covid-19/historical/all?lastdays=300').then(extractAxiosData);
}

export function getCountryDataForChart(countryCode) {
  return axios(`https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=300`).then(
    extractAxiosData
  );
}
