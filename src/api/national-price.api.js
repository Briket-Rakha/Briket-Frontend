/* eslint-disable require-jsdoc */
import axios from 'axios';
import querystring from 'querystring';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiNationalPriceBaseUrl = {
  root: `${apiBaseUrl}/national-price`,
};

export function apiGetNationalPriceData(params) {
  const query = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    axios
        .get(`${apiNationalPriceBaseUrl.root}?${query}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export function apiPostNationalPrice(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiNationalPriceBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
