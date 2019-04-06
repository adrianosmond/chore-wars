import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';

import choresReducer from './choresReducer';
import playersReducer from './playersReducer';
import pointsReducer from './pointsReducer';
import sessionReducer from './sessionReducer';

export const MAKE_UNDO_STATE = 'MAKE_UNDO_STATE';

export const canUndoSelector = state => state.chores.past.length > 0
  || state.points.past.length > 0;

export default combineReducers({
  chores: undoable(choresReducer, {
    filter: includeAction(MAKE_UNDO_STATE),
  }),
  points: undoable(pointsReducer, {
    filter: includeAction(MAKE_UNDO_STATE),
  }),
  players: playersReducer,
  session: sessionReducer,
});
