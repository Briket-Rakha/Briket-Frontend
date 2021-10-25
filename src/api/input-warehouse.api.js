
/* eslint-disable require-jsdoc */
import axios from 'axios';
import querystring from 'querystring';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiInputWarehouseBaseUrl = {
  root: `${apiBaseUrl}/input-warehouse`,
  dashboard: `${apiBaseUrl}/input-warehouse/dashboard`,
};

export async function apiGetWarehouseBrand() {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiInputWarehouseBaseUrl.dashboard}/dropdown-brand`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetWarehouseSummary(brand) {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiInputWarehouseBaseUrl.dashboard}/summary-brand/${brand}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export function apiGetNationalPriceDashboard(params) {
  const queries = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    axios
        .get((`${apiInputWarehouseBaseUrl.dashboard}/national-price?${queries}`))
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export function apiGetTotalBrandDashboard() {
  return new Promise((resolve, reject) => {
    axios
        .get((`${apiInputWarehouseBaseUrl.dashboard}/all-brand`))
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
