import { database } from '../lib/firebase';
import { setPointsLoaded } from './sessionActions';
import { ActionTypes } from '../constants/constants';

export function addPointsToUser(user, points, game) {
  return {
    type: ActionTypes.addPoints,
    user,
    points,
    game,
  };
}

export function setPoints(points) {
  return {
    type: ActionTypes.setPoints,
    points,
  };
}

export function loadPoints(game) {
  return (dispatch) => {
    database.ref(`games/${game}/points`).once('value', (result) => {
      dispatch(setPoints(result.val()));
      dispatch(setPointsLoaded(true));
    });
  };
}
