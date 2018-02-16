import { database } from '../lib/firebase';
import { addPointsToUser } from './pointActions';
import { setChoresLoaded } from './sessionActions';

export function addChore(newChore, game, slug) {
  return {
    type: 'ADD_CHORE',
    newChore,
    game,
    slug,
  };
}

export function resetDoneDate(game, slug) {
  return {
    type: 'RESET_CHORE_DONE_DATE',
    game,
    slug,
  };
}

export function blockChore(game, slug) {
  return {
    type: 'BLOCK_CHORE',
    game,
    slug,
  };
}

export function unblockChore(game, slug) {
  return {
    type: 'UNBLOCK_CHORE',
    game,
    slug,
  };
}

export function removeChore(game, slug) {
  return {
    type: 'REMOVE_CHORE',
    game,
    slug,
  };
}

export function updateChore(slug, newChore, newSlug, game) {
  return {
    type: 'UPDATE_CHORE',
    slug,
    newChore,
    newSlug,
    game,
  };
}

export function setChores(chores) {
  return {
    type: 'SET_CHORES',
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
    dispatch(resetDoneDate(game, chore.slug));
    if (chore.enables) {
      dispatch(blockChore(game, chore.slug));
      dispatch(unblockChore(game, chore.enables));
    }
    dispatch(addPointsToUser(user, chore.currentPoints, game));
  };
}
