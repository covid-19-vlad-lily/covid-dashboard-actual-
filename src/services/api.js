import axios from 'axios';
import {
  GLOBAL_COUNTRIES_DATA,
  GLOBAL_DATA,
  WORLD_DATA_FOR_CHART,
  COUNTRY_DATA_FOR_CHART,
} from '../constants/url.constants';

import { extractAxiosData, convertGlobalCountriesData, convertGlobalData } from '../utils';

export function getGlobalCountriesData() {
  return axios(GLOBAL_COUNTRIES_DATA)
    .then(extractAxiosData)
    .then((globalCountriesData) => convertGlobalCountriesData(globalCountriesData));
}

export function getGlobalData() {
  return axios(GLOBAL_DATA)
    .then(extractAxiosData)
    .then((globalData) => convertGlobalData(globalData));
}

export function getWorldDataForChart() {
  return axios(WORLD_DATA_FOR_CHART).then(extractAxiosData);
}

export function getCountryDataForChart(countryCode) {
  return axios(`${COUNTRY_DATA_FOR_CHART}${countryCode}?lastdays=300`).then(extractAxiosData);
}
