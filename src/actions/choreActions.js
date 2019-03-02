import { database } from 'utils/database';
import { ActionTypes } from 'constants/constants';
import { setChoresLoaded } from './sessionActions';

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
