/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiPenjualBaseUrl = {
  root: `${apiBaseUrl}/penjual`,
};

export function apiPostPenjual(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiPenjualBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
