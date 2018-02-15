import { database } from '../lib/firebase';

export default function pointsReducer(state = { points: null }, action) {
  const newState = { ...state };
  const newPoints = { ...newState.points };
  const { points, user, game } = action;

  switch (action.type) {
    case 'ADD_POINTS':
      newState.points = newPoints;
      newPoints[user].points += points;

      database.ref(`games/${game}/points/${user}/points`).set(newPoints[user].points);

      return newState;

    case 'SET_POINTS':
      newState.points = action.points;
      return newState;

    default:
      return state;
  }
}
