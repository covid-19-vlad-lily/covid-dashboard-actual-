import axios from 'axios';

import { extractAxiosData, convertGlobalCountriesData, convertGlobalData } from '../utils';

export function getGlobalCountriesData() {
  return axios('https://corona.lmao.ninja/v2/countries')
    .then((data) => extractAxiosData(data))
    .then((globalCountriesData) => convertGlobalCountriesData(globalCountriesData));
}

export function getGlobalData() {
  return axios('https://corona.lmao.ninja/v2/all')
    .then((data) => extractAxiosData(data))
    .then((globalData) => convertGlobalData(globalData));
}
