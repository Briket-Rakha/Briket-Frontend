/* eslint-disable require-jsdoc */
import axios from 'axios';

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

