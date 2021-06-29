
/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiPaymentBaseUrl = {
  root: `${apiBaseUrl}/payment`,
};

export function apiPostPayment(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiPaymentBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetAvailablePayment() {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiPaymentBaseUrl.root}/available`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
