const initialState = {
  loggedIn: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        loggedIn: true,
        user: { ...action.payload },
      };
    case 'LOG_OUT':
      localStorage.clear();
      return {
        loggedIn: false,
        user: {},
      };
    case 'ERROR_AUTH':
      return {
        loggedIn: false,
        user: {},
      };
    default:
      return state;
  }
};

export default authReducer;
