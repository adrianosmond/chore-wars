import { ActionTypes } from 'constants/constants';

export default function pointsReducer(state = { }, action) {
  const { points } = action;

  switch (action.type) {
    case ActionTypes.setPoints:
      return {
        ...points,
      };

      // case ActionTypes.saveStatePostUndo:
      //   database.ref(`games/${game}/points/`).set(state);
      //   return state;

    default:
      return state;
  }
}
