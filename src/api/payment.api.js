
/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiPaymentBaseUrl = {
  root: `${apiBaseUrl}/payment`,
  timeline: `${apiBaseUrl}/payment/timeline`,
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

export async function apiGetPaymentByMonth(month) {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiPaymentBaseUrl.root}/month/${month}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetPaymentTimeline(id) {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiPaymentBaseUrl.timeline}/${id}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
