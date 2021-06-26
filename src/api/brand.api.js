/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiBrandBaseUrl = {
  root: `${apiBaseUrl}/brand`,
};

export function apiPostBrand(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiBrandBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetBrand() {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiBrandBaseUrl.root}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
