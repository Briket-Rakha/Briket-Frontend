import TAB_TYPES from 'redux/types/tabTypes';

const initialState = {
  activeTab: 0,
};

const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case TAB_TYPES.SET_TAB:
      return {
        activeTab: action.payload,
      };
    default:
      return state;
  }
};

export default tabReducer;
