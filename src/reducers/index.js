import authReducer from './authReducer';
import tabReducer from './tabReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  authReducer,
  tabReducer,
});

export default rootReducer;
