/* eslint-disable require-jsdoc */
import axios from 'axios';
import querystring from 'querystring';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiWarehouseBaseUrl = {
  root: `${apiBaseUrl}/warehouse`,
};

export async function apiGetWarehouse(params) {
  const queries = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    axios
        .get(`${apiWarehouseBaseUrl.root}?${queries}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiDeleteWarehouse(id) {
  return new Promise((resolve, reject) => {
    axios
        .delete(`${apiWarehouseBaseUrl.root}/${id}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export function apiPostWarehouse(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiWarehouseBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
