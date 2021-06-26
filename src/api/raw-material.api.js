/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiMaterialBaseUrl = {
  root: `${apiBaseUrl}/raw-material`,
};

export function apiPostRawMaterial(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiMaterialBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
