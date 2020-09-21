import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import loadingReducer from './LoadingReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer
});

export default rootReducer;
