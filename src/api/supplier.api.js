/* eslint-disable require-jsdoc */
import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiSupplierBaseUrl = {
  root: `${apiBaseUrl}/supplier-has-material`,
};

export async function apiGetSupplierMaterial(idMaterial) {
  try {
    const res = await axios.get(`${apiSupplierBaseUrl.root}/${idMaterial}`);
    return (await res?.data);
  } catch (err) {
    console.error(err.response);
  }
}
