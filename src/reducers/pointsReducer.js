import { database } from '../lib/firebase';

export default function pointsReducer(state = { }, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { points, user, game } = action;

  switch (action.type) {
    case 'ADD_POINTS':
      newState[user].points += points;

      database.ref(`games/${game}/points/${user}/points`).set(newState[user].points);

      return newState;

    case 'SET_POINTS':
      return {
        ...action.points,
      };

    case 'SAVE_STATE_POST_UNDO':
      database.ref(`games/${game}/points/`).set(state);
      return state;

    default:
      return state;
  }
}
