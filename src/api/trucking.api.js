/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiTruckingBaseUrl = {
  root: `${apiBaseUrl}/input-trucking`,
};

export function apiPostTrucking(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiTruckingBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export function apiGetTrucking(warehouseID) {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiTruckingBaseUrl.root}?warehouse_id=${warehouseID}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

