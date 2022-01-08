import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const apiAuthBaseUrl = {
  login: `${apiBaseUrl}/auth/login`,
  register: `${apiBaseUrl}/user/register`,
};

export const apiPostLogin = (payload) => {
  return new Promise((resolve, reject) => {
    axios
        .post(apiAuthBaseUrl.login, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
  });
};

export const apiPostRegister = (payload) => {
  return new Promise((resolve, reject) => {
    axios
        .post(apiAuthBaseUrl.register, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err.response);
        });
  });
};

