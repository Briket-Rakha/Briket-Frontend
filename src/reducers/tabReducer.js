const initialState = {
  activeTab: 0,
};

const tabReducer = (state = initialState, action) => {
  return {
    activeTab: action.type,
  };
};

export default tabReducer;
