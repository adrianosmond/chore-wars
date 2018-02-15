import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import choresReducer from './choresReducer';
import pointsReducer from './pointsReducer';
import sessionReducer from './sessionReducer';

const undoableActions = [
  'ADD_CHORE',
  'RESET_CHORE_DONE_DATE',
  'REMOVE_CHORE',
  'UPDATE_CHORE',
];

export default combineReducers({
  chores: undoable(choresReducer, {
    filter: includeAction(undoableActions),
  }),
  points: undoable(pointsReducer, {
    filter: includeAction(undoableActions),
  }),
  session: sessionReducer,
});
