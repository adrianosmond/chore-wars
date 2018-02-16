import { database } from '../lib/firebase';

export default function choresReducer(state = { }, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const now = new Date().getTime();

  switch (action.type) {
    case 'ADD_CHORE':
      database.ref(`games/${action.game}/chores/${action.slug}`).set(action.newChore);

      return {
        ...state,
        [action.slug]: action.newChore,
      };

    case 'RESET_CHORE_DONE_DATE':
      newState[action.slug].lastDone = now;
      database.ref(`games/${action.game}/chores/${action.slug}/lastDone`).set(now);
      return newState;

    case 'BLOCK_CHORE':
      newState[action.slug].isWaiting = true;
      database.ref(`games/${action.game}/chores/${action.slug}/isWaiting`).set(true);
      return newState;

    case 'UNBLOCK_CHORE':
      newState[action.slug].isWaiting = false;
      database.ref(`games/${action.game}/chores/${action.slug}/isWaiting`).set(false);
      return newState;

    case 'REMOVE_CHORE':
      delete newState[action.slug];
      database.ref(`games/${action.game}/chores/${action.slug}`).set(null);
      return newState;

    case 'UPDATE_CHORE':
      newState[action.newSlug] = action.newChore;
      database.ref(`games/${action.game}/chores/${action.newSlug}`).set(action.newChore);

      if (action.slug !== action.newSlug) {
        delete newState[action.slug];
        database.ref(`games/${action.game}/chores/${action.slug}`).set(null);
      }
      return newState;

    case 'SET_CHORES':
      return {
        ...action.chores,
      };

    case 'SAVE_STATE_POST_UNDO':
      database.ref(`games/${action.game}/chores/`).set(state);
      return state;

    default:
      return state;
  }
}
