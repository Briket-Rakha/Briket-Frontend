/* eslint-disable require-jsdoc */
import axios from 'axios';
import querystring from 'querystring';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiHasilProduksiBaseUrl = {
  root: `${apiBaseUrl}/hasil`,
  graph: `${apiBaseUrl}/graph/hasilproduksi`,
};

export function apiPostHasilProduksi(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiHasilProduksiBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export function apiGetHasilProduksiGraph(params) {
  const queries = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    axios.get(`${apiHasilProduksiBaseUrl.graph}?${queries}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetHasilDashboard() {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiHasilProduksiBaseUrl.root}/summary`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
          // console.error(err);
        });
  });
}
