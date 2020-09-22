import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import loadingReducer from './LoadingReducer';
import activityReducer from './ActivityReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  activity: activityReducer
});

export default rootReducer;
