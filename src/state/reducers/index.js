import { combineReducers } from 'redux';
import choresReducer from './choresReducer';
import playersReducer from './playersReducer';
import pointsReducer from './pointsReducer';
import sessionReducer from './sessionReducer';

export default combineReducers({
  chores: choresReducer,
  points: pointsReducer,
  players: playersReducer,
  session: sessionReducer,
});
