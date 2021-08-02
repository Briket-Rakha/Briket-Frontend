/* eslint-disable require-jsdoc */
import axios from 'axios';
import querystring from 'querystring';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiPabrikBaseUrl = {
  root: `${apiBaseUrl}/pabrik`,
};

export function apiPostPabrik(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiPabrikBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetPabrik(params) {
  const queries = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    axios
        .get(`${apiPabrikBaseUrl.root}?${queries}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiDeletePabrik(id) {
  return new Promise((resolve, reject) => {
    axios
        .delete(`${apiPabrikBaseUrl.root}/${id}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
