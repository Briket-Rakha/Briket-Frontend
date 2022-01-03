import TAB_TYPES from 'redux/types/tabTypes';

export const setTab = (tab) => (dispatch) => {
  localStorage.setItem('tab', tab);
  dispatch({ type: TAB_TYPES.SET_TAB, payload: tab });
};
