/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiCharcoalBaseUrl = {
  root: `${apiBaseUrl}/OM`,
};

export function apiPostCharcoal(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiCharcoalBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
