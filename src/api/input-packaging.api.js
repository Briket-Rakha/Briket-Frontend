/* eslint-disable require-jsdoc */
import axios from 'axios';
import querystring from 'querystring';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiInputPackagingBaseUrl = {
  root: `${apiBaseUrl}/input-packaging`,
  unshipped: `${apiBaseUrl}/shipping/containerForm`,
};

export function apiPostInputPackaging(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiInputPackagingBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetInputPackaging(params) {
  const queries = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    axios
        .get(`
        ${apiInputPackagingBaseUrl.root}?${queries}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetContainer() {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiInputPackagingBaseUrl.root}/container`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetUnshippedContainer() {
  return new Promise((resolve, reject) => {
    axios
        .get( apiInputPackagingBaseUrl.unshipped)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
