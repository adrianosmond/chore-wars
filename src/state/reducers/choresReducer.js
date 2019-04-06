import { database } from 'utils/database';
import { ActionTypes } from 'constants/constants';
import { setChoresLoaded } from './sessionReducer';
import { MAKE_UNDO_STATE } from '.';

export const setChores = chores => ({
  type: ActionTypes.setChores,
  chores,
});

export const loadChores = game => (dispatch) => {
  database.ref(`games/${game}/chores`).once('value', () => {
    dispatch(setChoresLoaded(true));
  });
  database.ref(`games/${game}/chores`).on('value', (result) => {
    dispatch(setChores(result.val() || {}));
  });
};

export default function choresReducer(state = { }, action) {
  switch (action.type) {
    case ActionTypes.setChores:
      return {
        ...action.chores,
      };

    case MAKE_UNDO_STATE:
      return {
        ...state,
      };

    default:
      return state;
  }
}
