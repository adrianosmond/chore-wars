import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { MAX_POINT_DIFFERENCE } from 'constants/constants';
import store from 'state/store';
import { MAKE_UNDO_STATE } from 'state/reducers';

const config = {
  apiKey: 'AIzaSyDbbw8FphkN-k6gsLjVTJRnPSnZUGWw_L0',
  authDomain: 'chore-wars-ba2a9.firebaseapp.com',
  databaseURL: 'https://chore-wars-ba2a9.firebaseio.com',
  projectId: 'chore-wars-ba2a9',
  storageBucket: 'chore-wars-ba2a9.appspot.com',
  messagingSenderId: '344287360518',
};

const createUndoState = () => store.dispatch({ type: MAKE_UNDO_STATE });

app.initializeApp(config);

export const database = app.database();
export const auth = app.auth();

export const addPointsToUser = (userId, points, game) => {
  database.ref(`games/${game}/points/${userId}/points`).once('value', (result) => {
    const pts = result.val();
    database.ref(`games/${game}/points/${userId}/points`).set(pts + points);
  });
};

export const claimPrize = (userId, game) => {
  database.ref(`games/${game}/points/${userId}`).once('value', (result) => {
    createUndoState();
    const user = result.val();
    database.ref(`games/${game}/points/${userId}`).update({
      points: user.points - MAX_POINT_DIFFERENCE,
      isOwed: user.isOwed + 1,
    });
  });
};

export const paidDebt = (userId, game) => {
  database.ref(`games/${game}/points/${userId}/isOwed`).once('value', (result) => {
    createUndoState();
    const owed = result.val();
    database.ref(`games/${game}/points/${userId}/isOwed`).set(owed - 1);
  });
};

export const addChore = (newChore, game, slug) => {
  createUndoState();
  database.ref(`games/${game}/chores/${slug}`).set(newChore);
};

export const resetDoneDate = (game, slug, time) => {
  database.ref(`games/${game}/chores/${slug}/lastDone`).set(time);
};

export const resetTimePaused = (game, slug) => {
  database.ref(`games/${game}/chores/${slug}/timePaused`).set(0);
};

export const blockChore = (game, slug) => {
  database.ref(`games/${game}/chores/${slug}/isWaiting`).set(true);
};

export const unblockChore = (game, slug) => {
  database.ref(`games/${game}/chores/${slug}/isWaiting`).set(false);
};

export const addToTimePaused = (game, slug, existingTimePaused, timePaused) => {
  database.ref(`games/${game}/chores/${slug}/timePaused`).set(existingTimePaused + timePaused);
};

export const updateChore = (slug, newChore, newSlug, game, allChores) => {
  createUndoState();
  database.ref(`games/${game}/chores/${newSlug}`).set(newChore);

  if (slug !== newSlug) {
    database.ref(`games/${game}/chores/${slug}`).set(null);

    // Check to see if this chore is part of a chain and rename references to it
    Object.keys(allChores).forEach((choreSlug) => {
      if (allChores[choreSlug].enables === slug) {
        database.ref(`games/${game}/chores/${choreSlug}/enables`).set(newSlug);
      }
    });
  }
};

export const makeChain = (game, chain) => {
  createUndoState();
  chain.forEach((slug, idx) => {
    const waiting = idx !== 0;
    const enables = chain[(idx + 1) % chain.length];

    database.ref(`games/${game}/chores/${slug}`).update({
      isWaiting: waiting,
      enables,
    });
  });
};

export const breakChain = (game, slug, allChores) => {
  createUndoState();
  let { enables } = allChores[slug];
  while (enables) {
    database.ref(`games/${game}/chores/${enables}/enables`).update({
      enables: null,
      isWaiting: null,
    });
    if (enables === slug) {
      break;
    }
    ({ enables } = allChores[enables]);
  }
};

export const removeChore = (game, slug, allChores) => {
  // We do want to be able to undo this, but breakChain calls createUndoState, so we don't need to.
  breakChain(game, slug, allChores);
  database.ref(`games/${game}/chores/${slug}`).set(null);
};

export const completeChore = (chore, user, game, time = new Date().getTime()) => {
  createUndoState();
  resetDoneDate(game, chore.slug, time);
  if (chore.timePaused) {
    resetTimePaused(game, chore.slug);
  }
  if (chore.enables) {
    blockChore(game, chore.slug);
    // Work around a bug in FlipMove
    setTimeout(() => unblockChore(game, chore.enables), 1000);
  }
  addPointsToUser(user, chore.currentPoints, game);
};

export const savePlayerName = (player, name, game) => {
  database.ref(`games/${game}/players/${player}/name`).set(name);
};

export const savePlayerAvatar = (player, avatar, game) => {
  database.ref(`games/${game}/players/${player}/avatar`).set(avatar);
};

export const saveStatePostUndo = () => {
  const currentState = store.getState();
  const game = currentState.session.game.gameId;
  const chores = currentState.chores.present;
  const points = currentState.points.present;
  database.ref(`games/${game}/chores/`).set(chores);
  database.ref(`games/${game}/points/`).set(points);
};
