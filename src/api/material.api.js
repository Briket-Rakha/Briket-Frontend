/* eslint-disable require-jsdoc */
import axios from 'axios';
import querystring from 'querystring';

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

export async function apiGetMaterial(params) {
  const queries = querystring.stringify(params);

  return new Promise((resolve, reject) => {
    axios
        .get(`${apiMaterialBaseUrl.root}?${queries}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetMaterialbyPabrik(params) {
  return new Promise((resolve, reject) => {
    axios
        .get(`${apiMaterialBaseUrl.root}/pabrik/${params}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetMaterialDashboard(idPabrik) {
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
export async function apiDeleteMaterial(id) {
  return new Promise((resolve, reject) => {
    axios
        .delete(`${apiMaterialBaseUrl.root}/${id}`)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}
