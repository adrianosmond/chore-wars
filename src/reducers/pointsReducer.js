import { database } from '../lib/firebase';
import { ActionTypes } from '../constants/constants';

export default function pointsReducer(state = { }, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { points, user, game } = action;

  switch (action.type) {
    case ActionTypes.addPoints:
      newState[user].points += points;

      database.ref(`games/${game}/points/${user}/points`).set(newState[user].points);

      return newState;

    case ActionTypes.setPoints:
      return {
        ...action.points,
      };

    case ActionTypes.saveStatePostUndo:
      database.ref(`games/${game}/points/`).set(state);
      return state;

    default:
      return state;
  }
}
