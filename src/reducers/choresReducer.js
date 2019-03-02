import { ActionTypes } from 'constants/constants';

export default function choresReducer(state = { }, action) {
  switch (action.type) {
    case ActionTypes.setChores:
      return {
        ...action.chores,
      };

      // case ActionTypes.saveStatePostUndo:
      //   database.ref(`games/${action.game}/chores/`).set(state);
      //   return state;

    default:
      return state;
  }
}
