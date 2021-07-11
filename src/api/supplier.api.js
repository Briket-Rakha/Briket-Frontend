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

export async function apiGetSupplierMaterial(idMaterial) {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiSupplierBaseUrl.material}`)
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

export async function apiGetSupplierOutsource(idMaterial) {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiSupplierBaseUrl.outsource}`)
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
  console.log(`${apiSupplierBaseUrl.graph}/?${queries}`);

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
