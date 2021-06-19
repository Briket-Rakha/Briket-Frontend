import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const setUser = (payload) => ({ type: 'SET_USER', payload });

export const logOut = () => (dispatch) => {
  dispatch({ type: 'LOG_OUT' });
};

export const signIn = (credentials) => (dispatch) => {
  axios
      .post(`${apiBaseUrl}/user/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      })
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        dispatch(setUser(res.user));
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: 'ERROR_AUTH',
        });
      });
};

// export const getAuthenticated = () => (dispatch) => {
//   axios
//       .get(`${apiBaseUrl}/api/user/login`, {
//         headers: {
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//       })
//       .then((res) => {
//         localStorage.setItem('token', res.token);
//         dispatch(setUser(res.user));
//       })
//       .catch((error) => {
//         dispatch({
//           type: 'ERROR_AUTH',
//         });
//       });
// };
