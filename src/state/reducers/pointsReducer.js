import { ActionTypes } from 'constants/constants';
import { database } from 'utils/database';
import { setPointsLoaded } from './sessionReducer';
import { MAKE_UNDO_STATE } from '.';

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

export default function pointsReducer(state = { }, action) {
  const { points } = action;

  switch (action.type) {
    case ActionTypes.setPoints:
      return {
        ...points,
      };

    case MAKE_UNDO_STATE:
      return {
        ...state,
      };

    default:
      return state;
  }
}
