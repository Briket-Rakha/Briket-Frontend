/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiInputPackagingBaseUrl = {
  root: `${apiBaseUrl}/input-packaging`,
};

export function apiPostInputPackaging(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiInputPackagingBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}