/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiMaterialBaseUrl = {
  root: `${apiBaseUrl}/material`,
};

export function apiPostMaterial(payload) {
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

export async function apiGetMaterial(idPabrik) {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiMaterialBaseUrl.root}/${idPabrik}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
