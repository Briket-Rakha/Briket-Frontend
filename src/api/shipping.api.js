/* eslint-disable require-jsdoc */
import axios from 'axios';
import querystring from 'querystring';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiShippingBaseUrl = {
  root: `${apiBaseUrl}/shipping`,
};

export function apiPostShipping(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiShippingBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetShipping(params) {
  const queries = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    axios
        .get(`
        ${apiShippingBaseUrl.root}?${queries}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetContainerShipping() {
  return new Promise((resolve, reject) => {
    axios
        .get(`
        ${apiShippingBaseUrl.root}/containerDashboard`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

