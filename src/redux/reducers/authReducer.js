import AUTH_TYPE from '../types/authTypes';

const initialState = {
  isLoading: false,
  loggedIn: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPE.USER_LOADING:
      return {
        ...state,
        isLoading: true,
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
