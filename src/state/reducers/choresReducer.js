import { database } from 'utils/database';
import { ActionTypes } from 'constants/constants';
import { setChoresLoaded } from './sessionReducer';

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

    default:
      return state;
  }
}
