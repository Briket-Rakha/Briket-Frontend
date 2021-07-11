/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiHasilProduksiBaseUrl = {
  root: `${apiBaseUrl}/hasil`,
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

export async function apiGetHasilDashboard() {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiHasilProduksiBaseUrl.root}/summary`)
        .then((response) => {
          console.log({ response });
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
