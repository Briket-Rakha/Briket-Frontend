import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

// For User
const setUser = (payload) => ({ type: 'SET_USER', payload });

export const logOut = () => (dispatch) => {
  dispatch({ type: 'LOG_OUT' });
};

export const signIn = (credentials) => async (dispatch) => {
  await axios
      .post(`${apiBaseUrl}/auth/login`, credentials)
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data.data));
        dispatch(setUser(res.user));
      })
      .catch((error) => {
        dispatch({
          type: 'ERROR_AUTH',
        });

        throw error;
      });
};

// For tab
export const setTab = (tab) => (dispatch) => {
  dispatch({ type: tab });
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
