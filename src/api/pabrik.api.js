/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiPabrikBaseUrl = {
  root: `${apiBaseUrl}/pabrik`,
};

export function apiPostPabrik(payload) {
  return new Promise((resolve, reject) => {
    axios
        .post(apiPabrikBaseUrl.root, payload)
        .then((response) => {
          resolve({ response });
        })
        .catch((err) => {
          reject(err.response);
        });
  });
}

export async function apiGetPabrik() {
  try {
    const res = await axios.get(apiPabrikBaseUrl.root);
    return (await res?.data);
  } catch (err) {
    console.error(err.response);
  }
}
