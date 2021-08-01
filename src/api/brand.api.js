/* eslint-disable require-jsdoc */
import axios from 'axios';
import querystring from 'querystring';

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

export async function apiGetBrand(params) {
  const queries = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    axios
        .get(`${apiBrandBaseUrl.root}?${queries}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiDeleteBrand(id) {
  return new Promise((resolve, reject) => {
    axios
        .delete(`${apiBrandBaseUrl.root}/${id}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
