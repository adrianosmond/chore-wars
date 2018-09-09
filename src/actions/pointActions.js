import { database } from 'lib/firebase';
import { ActionTypes } from 'constants/constants';
import { setPointsLoaded } from './sessionActions';

export function addPointsToUser(user, points, game) {
  return {
    type: ActionTypes.addPoints,
    user,
    points,
    game,
  };
}

export function claimPrize(user, game) {
  return {
    type: ActionTypes.claimPrize,
    user,
    game,
  };
}

export function paidDebt(user, game) {
  return {
    type: ActionTypes.paidDebt,
    user,
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
  return dispatch =>
    database.ref(`games/${game}/points`).on('value', (result) => {
      requestAnimationFrame(() => {
        dispatch(setPoints(result.val()));
        dispatch(setPointsLoaded(true));
      });
    });
}
