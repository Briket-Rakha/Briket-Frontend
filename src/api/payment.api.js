
/* eslint-disable require-jsdoc */
import axios from 'axios';
import querystring from 'querystring';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiPaymentBaseUrl = {
  root: `${apiBaseUrl}/payment`,
  timeline: `${apiBaseUrl}/payment/timeline`,
  type: `${apiBaseUrl}/jenis-pembayaran`,
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

export async function apiGetPaymentByMonth(month, year) {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiPaymentBaseUrl.root}/month/${month}/${year}`)
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

export async function apiGetPaymentType(type) {
  let klasifikasi = 0;
  if (type === 'shipping') klasifikasi = 1;
  else if (type === 'trucking') klasifikasi = 2;

  const params = {
    klasifikasi,
  };

  const query = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    axios
        .get(`${apiPaymentBaseUrl.type}?${query}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
