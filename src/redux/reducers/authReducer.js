import AUTH_TYPE from '../types/authTypes';

const initialState = {
  isLoading: false,
  loggedIn: false,
  user: {},
};
// const savedUser = JSON.parse(localStorage.getItem('user'));
// const initialState = savedUser ? {
//   token: savedUser.token,
//   userId: savedUser.ID,
//   role: savedUser.role,
//   isAuthenticated: false,
//   isLoading: false,
// } : notLoggedInState;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPE.USER_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case AUTH_TYPE.USER_LOADED:
      return {
        isLoading: false,
        loggedIn: true,
        user: { ...action.payload },
      };
    case AUTH_TYPE.USER_LOGOUT:
      return {
        isLoading: false,
        loggedIn: false,
        user: {},
      };
    case AUTH_TYPE.AUTH_ERROR:
      return {
        isLoading: false,
        loggedIn: false,
        user: {},
      };
    default:
      return state;
  }
};

export default authReducer;
