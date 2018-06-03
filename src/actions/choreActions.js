import { database } from 'lib/firebase';
import { ActionTypes } from 'constants/constants';
import { addPointsToUser } from './pointActions';
import { setChoresLoaded } from './sessionActions';

export function addChore(newChore, game, slug) {
  return {
    type: ActionTypes.addChore,
    newChore,
    game,
    slug,
  };
}

export function resetDoneDate(game, slug, time) {
  return {
    type: ActionTypes.resetChoreDoneDate,
    game,
    slug,
    time,
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

export function updateChore(slug, newChore, newSlug, game) {
  return {
    type: ActionTypes.updateChore,
    slug,
    newChore,
    newSlug,
    game,
  };
}

export function makeChain(game, chain) {
  return {
    type: ActionTypes.makeChain,
    game,
    chain,
  };
}

export function breakChain(game, slug) {
  return {
    type: ActionTypes.breakChain,
    game,
    slug,
  };
}

export function removeChore(game, slug) {
  return (dispatch) => {
    dispatch(breakChain(game, slug));
    dispatch({
      type: ActionTypes.removeChore,
      game,
      slug,
    });
  };
}

export function setChores(chores) {
  return {
    type: ActionTypes.setChores,
    chores,
  };
}

export function addToTimePaused(game, slug, timePaused) {
  return {
    type: ActionTypes.addToChorePausedTime,
    game,
    slug,
    timePaused,
  };
}

export function loadChores(game) {
  return dispatch => database.ref(`games/${game}/chores`).once('value', (result) => {
    const chores = result.val() || {};
    dispatch(setChores(chores));
    dispatch(setChoresLoaded(true));
  });
}

export function completeChore(chore, user, game, time = new Date().getTime()) {
  return (dispatch) => {
    dispatch(resetDoneDate(game, chore.slug, time));
    if (chore.enables) {
      dispatch(blockChore(game, chore.slug));
      dispatch(unblockChore(game, chore.enables));
    }
    dispatch(addPointsToUser(user, chore.currentPoints, game));
  };
}
