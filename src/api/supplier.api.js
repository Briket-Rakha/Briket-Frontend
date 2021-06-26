/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiSupplierBaseUrl = {
  root: `${apiBaseUrl}/material-supplier`,
};

export async function apiGetSupplierMaterial(idMaterial) {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiSupplierBaseUrl.root}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
