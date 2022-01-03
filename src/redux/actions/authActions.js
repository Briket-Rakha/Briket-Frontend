import AUTH_TYPE from 'redux/types/authTypes';
import { apiPostLogin } from 'api/auth.api';

export const loadUser = () => (dispatch) =>
  dispatch({ type: AUTH_TYPE.USER_LOADING });

export const setUser = (payload) => ({ type: AUTH_TYPE.USER_LOADED, payload });

export const login = (payload) => async (dispatch) => {
  dispatch({ type: AUTH_TYPE.USER_LOADING });
  await apiPostLogin(payload)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.data));
        dispatch(setUser(res.data.data));
      })
      .catch((err) => {
        dispatch({ type: AUTH_TYPE.AUTH_ERROR });
        throw err;
      });
};

export const errorAuth = () => (dispatch) =>
  dispatch({ type: AUTH_TYPE.AUTH_ERROR });

export const logout = () => (dispatch) => {
  localStorage.removeItem('user');
  dispatch({ type: AUTH_TYPE.USER_LOGOUT });
};
