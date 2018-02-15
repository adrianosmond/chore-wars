import { database } from '../lib/firebase';

export default function choresReducer(state = { chores: {} }, action) {
  const newState = { ...state };
  const now = new Date().getTime();

  switch (action.type) {
    case 'ADD_CHORE':
      newState.chores = {
        ...state.chores,
        [action.slug]: action.newChore,
      };

      database.ref(`games/${action.game}/chores/${action.slug}`).set(action.newChore);

      return newState;

    case 'RESET_CHORE_DONE_DATE':
      newState.chores = {
        ...state.chores,
      };
      newState.chores[action.slug].lastDone = now;
      database.ref(`games/${action.game}/chores/${action.slug}/lastDone`).set(now);
      return newState;

    case 'REMOVE_CHORE':
      newState.chores = {
        ...state.chores,
      };
      delete newState.chores[action.slug];
      database.ref(`games/${action.game}/chores/${action.slug}`).set(null);
      return newState;

    case 'UPDATE_CHORE':
      newState.chores[action.newSlug] = action.newChore;
      database.ref(`games/${action.game}/chores/${action.newSlug}`).set(action.newChore);

      if (action.slug !== action.newSlug) {
        delete newState.chores[action.slug];
        database.ref(`games/${action.game}/chores/${action.slug}`).set(null);
      }
      return newState;

    case 'SET_CHORES':
      newState.chores = action.chores;
      return newState;

    default:
      return state;
  }
}
