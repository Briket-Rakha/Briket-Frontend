/* eslint-disable require-jsdoc */
import axios from 'axios';

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

export async function apiGetMaterial(idPabrik) {
  try {
    const res = await axios.get(`${apiMaterialBaseUrl.root}/${idPabrik}`);
    console.log(`${apiMaterialBaseUrl.root}/${idPabrik}`);
    console.log(await res?.data);
    return (await res?.data);
  } catch (err) {
    console.error(err.response);
  }
}
