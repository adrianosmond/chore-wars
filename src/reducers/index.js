import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';
import { ActionTypes } from 'constants/constants';
import choresReducer from './choresReducer';
import pointsReducer from './pointsReducer';
import sessionReducer from './sessionReducer';

const undoableActions = [
  ActionTypes.addChore,
  ActionTypes.resetChoreDoneDate,
  ActionTypes.removeChore,
  ActionTypes.updateChore,
  ActionTypes.makeChain,
  ActionTypes.breakChain,
  ActionTypes.claimPrize,
  ActionTypes.paidDebt,
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
