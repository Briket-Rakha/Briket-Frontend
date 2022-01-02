import AUTH_TYPE from '../types/authTypes';

const initialState = {
  user: {},
  isAuthenticated: false,
  isLoading: false,
};
// const savedUser = JSON.parse(localStorage.getItem('user'));
// const initialState = savedUser ? {
//   token: savedUser.token,
//   userId: savedUser.ID,
//   role: savedUser.role,
//   isAuthenticated: false,
//   isLoading: false,
// } : notLoggedInState;

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPE.USER_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case AUTH_TYPE.USER_LOADED:
      return {
        user: { ...action.payload },
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_TYPE.USER_LOGOUT:
      return {
        user: {},
        isAuthenticated: false,
        isLoading: false,
      };
    case AUTH_TYPE.AUTH_ERROR:
      return {
        user: {},
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};
