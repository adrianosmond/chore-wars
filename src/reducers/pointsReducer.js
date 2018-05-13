import { database } from 'lib/firebase';
import { ActionTypes, MAX_POINT_DIFFERENCE } from 'constants/constants';

export default function pointsReducer(state = { }, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { points, user, game } = action;

  switch (action.type) {
    case ActionTypes.addPoints:
      newState[user].points += points;
      database.ref(`games/${game}/points/${user}/points`).set(newState[user].points);
      return newState;

    case ActionTypes.claimPrize:
      newState[user].points -= MAX_POINT_DIFFERENCE;
      newState[user].isOwed += 1;

      database.ref(`games/${game}/points/${user}/points`).set(newState[user].points);
      database.ref(`games/${game}/points/${user}/isOwed`).set(newState[user].isOwed);

      return newState;

    case ActionTypes.paidDebt:
      newState[user].isOwed -= 1;
      database.ref(`games/${game}/points/${user}/isOwed`).set(newState[user].isOwed);
      return newState;

    case ActionTypes.updateUserName:
      newState[user].name = action.name;
      return newState;

    case ActionTypes.updateUserAvatar:
      newState[user].avatar = action.avatar;
      return newState;

    case ActionTypes.saveUserName:
      database.ref(`games/${game}/points/${user}/name`).set(action.name);
      return state;

    case ActionTypes.saveUserAvatar:
      database.ref(`games/${game}/points/${user}/avatar`).set(action.avatar);
      return state;

    case ActionTypes.setPoints:
      return {
        ...points,
      };

    case ActionTypes.saveStatePostUndo:
      database.ref(`games/${game}/points/`).set(state);
      return state;

    default:
      return state;
  }
}
