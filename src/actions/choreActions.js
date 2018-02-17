import { database } from '../lib/firebase';
import { addPointsToUser } from './pointActions';
import { setChoresLoaded } from './sessionActions';
import { ActionTypes } from '../constants/constants';

export function addChore(newChore, game, slug) {
  return {
    type: ActionTypes.addChore,
    newChore,
    game,
    slug,
  };
}

export function resetDoneDate(game, slug, now) {
  return {
    type: ActionTypes.resetChoreDoneDate,
    game,
    slug,
    now,
  };
}

export function blockChore(game, slug) {
  return {
    type: ActionTypes.blockChore,
    game,
    slug,
  };
}

export function unblockChore(game, slug) {
  return {
    type: ActionTypes.unblockChore,
    game,
    slug,
  };
}

export function removeChore(game, slug) {
  return {
    type: ActionTypes.removeChore,
    game,
    slug,
  };
}

export function updateChore(slug, newChore, newSlug, game) {
  return {
    type: ActionTypes.updateChore,
    slug,
    newChore,
    newSlug,
    game,
  };
}

export function setChores(chores) {
  return {
    type: ActionTypes.setChores,
    chores,
  };
}

export function loadChores(game) {
  return (dispatch) => {
    database.ref(`games/${game}/chores`).once('value', (result) => {
      const chores = result.val() || {};
      dispatch(setChores(chores));
      dispatch(setChoresLoaded(true));
    });
  };
}

export function completeChore(chore, user, game) {
  return (dispatch) => {
    const now = new Date().getTime();
    dispatch(resetDoneDate(game, chore.slug, now));
    if (chore.enables) {
      dispatch(blockChore(game, chore.slug));
      dispatch(unblockChore(game, chore.enables));
    }
    dispatch(addPointsToUser(user, chore.currentPoints, game));
  };
}
