/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiRawMaterialBaseUrl = {
  root: `${apiBaseUrl}/raw-material`,
};

export function apiPostRawMaterial(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiRawMaterialBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
