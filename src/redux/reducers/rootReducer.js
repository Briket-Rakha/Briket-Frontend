import authReducer from './authReducer';
import tabReducer from './tabReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  tab: tabReducer,
});

export default rootReducer;
