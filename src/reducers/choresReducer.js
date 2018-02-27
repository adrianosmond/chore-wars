import { database } from '../lib/firebase';
import { ActionTypes } from '../constants/constants';

export default function choresReducer(state = { }, action) {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case ActionTypes.addChore:
      database.ref(`games/${action.game}/chores/${action.slug}`).set(action.newChore);

      return {
        ...state,
        [action.slug]: action.newChore,
      };

    case ActionTypes.resetChoreDoneDate:
      newState[action.slug].lastDone = action.time;
      database.ref(`games/${action.game}/chores/${action.slug}/lastDone`).set(action.time);
      return newState;

    case ActionTypes.blockChore:
      newState[action.slug].isWaiting = true;
      database.ref(`games/${action.game}/chores/${action.slug}/isWaiting`).set(true);
      return newState;

    case ActionTypes.unblockChore:
      newState[action.slug].isWaiting = false;
      database.ref(`games/${action.game}/chores/${action.slug}/isWaiting`).set(false);
      return newState;

    case ActionTypes.removeChore:
      delete newState[action.slug];
      database.ref(`games/${action.game}/chores/${action.slug}`).set(null);
      return newState;

    case ActionTypes.updateChore:
      newState[action.newSlug] = action.newChore;
      database.ref(`games/${action.game}/chores/${action.newSlug}`).set(action.newChore);

      if (action.slug !== action.newSlug) {
        delete newState[action.slug];
        database.ref(`games/${action.game}/chores/${action.slug}`).set(null);

        // Check to see if this chore is part of a chain and rename references to it
        Object.keys(newState).forEach((slug) => {
          if (newState[slug].enables === action.slug) {
            newState[slug].enables = action.newSlug;
            database.ref(`games/${action.game}/chores/${slug}/enables`).set(action.newSlug);
          }
        });
      }

      return newState;

    case ActionTypes.makeChain:
      action.chain.forEach((slug, idx) => {
        const waiting = idx !== 0;
        const enables = action.chain[(idx + 1) % action.chain.length];

        newState[slug].isWaiting = waiting;
        database.ref(`games/${action.game}/chores/${slug}/isWaiting`).set(waiting);

        newState[slug].enables = enables;
        database.ref(`games/${action.game}/chores/${slug}/enables`).set(enables);
      });
      return newState;

    case ActionTypes.breakChain: {
      let { enables } = newState[action.slug];
      while (enables) {
        const chore = newState[enables];
        ({ enables } = chore);
        delete chore.enables;
        database.ref(`games/${action.game}/chores/${enables}/enables`).set(null);
        delete chore.isWaiting;
        database.ref(`games/${action.game}/chores/${enables}/isWaiting`).set(null);
      }
      return newState;
    }

    case ActionTypes.setChores:
      return {
        ...action.chores,
      };

    case ActionTypes.saveStatePostUndo:
      database.ref(`games/${action.game}/chores/`).set(state);
      return state;

    default:
      return state;
  }
}
