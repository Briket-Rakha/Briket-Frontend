/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiPackageBaseUrl = {
  root: `${apiBaseUrl}/package`,
};

export async function apiGetPackaging() {
  return new Promise((resolve, reject) => {
    axios
        .get(apiPackageBaseUrl.root)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
