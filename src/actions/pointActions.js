import { database } from 'utils/database';
import { ActionTypes } from 'constants/constants';
import { setPointsLoaded } from './sessionActions';

export const setPoints = points => ({
  type: ActionTypes.setPoints,
  points,
});

export const loadPoints = game => (dispatch) => {
  database.ref(`games/${game}/points`).once('value', () => {
    dispatch(setPointsLoaded(true));
  });
  database.ref(`games/${game}/points`).on('value', (result) => {
    dispatch(setPoints(result.val()));
  });
};
