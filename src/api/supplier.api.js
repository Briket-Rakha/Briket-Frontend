/* eslint-disable require-jsdoc */
import axios from 'axios';
import querystring from 'querystring';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiSupplierBaseUrl = {
  material: `${apiBaseUrl}/material-supplier`,
  outsource: `${apiBaseUrl}/outsource`,
  om: `${apiBaseUrl}/OM`,
  graph: `${apiBaseUrl}/graph/outsource`,
};

export async function apiGetSupplierMaterial(params) {
  const queries = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    axios
        .get(`${apiSupplierBaseUrl.material}?${queries}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiDeleteSupplierMaterial(id) {
  return new Promise((resolve, reject) => {
    axios
        .delete(`${apiSupplierBaseUrl.material}/${id}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export function apiPostSupplierMaterial(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiSupplierBaseUrl.material, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetSupplierOutsource(params) {
  const queries = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    axios
        .get(`${apiSupplierBaseUrl.outsource}?${queries}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiDeleteSupplierOutsource(id) {
  return new Promise((resolve, reject) => {
    axios
        .delete(`${apiSupplierBaseUrl.outsource}/${id}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export function apiPostSupplierOutsource(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiSupplierBaseUrl.outsource, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export function apiGetOutsourceMaterial(id) {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiSupplierBaseUrl.om}/${id}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export function apiGetOutsourceProduksiGraph(params) {
  const queries = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    axios.get(`${apiSupplierBaseUrl.graph}?${queries}`)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
