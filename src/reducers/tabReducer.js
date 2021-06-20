const initialState = {
  activeTab: 0,
};

const tabReducer = (state = initialState, action) => {
  switch (action.type) {
    case 0:
      return {
        activeTab: 0,
      };
    case 1:
      return {
        activeTab: 1,
      };
    case 2:
      return {
        activeTab: 2,
      };
    case 3:
      return {
        activeTab: 3,
      };
    case 4:
      return {
        activeTab: 3,
      };
    default:
      return {
        activeTab: 0,
      };
  }
};

export default tabReducer;
