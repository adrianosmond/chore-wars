import { combineReducers } from 'redux';
import choresReducer from './choresReducer';
import pointsReducer from './pointsReducer';
import sessionReducer from './sessionReducer';

export default combineReducers({
  chores: choresReducer,
  points: pointsReducer,
  session: sessionReducer
});
