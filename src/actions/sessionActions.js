import { ActionTypes } from '../constants/constants';
import { auth } from '../lib/firebase';

export function setAuthUser(authUser) {
  return {
    type: ActionTypes.setAuthUser,
    authUser,
  };
}

export function setGame(game) {
  return {
    type: ActionTypes.setGame,
    game,
  };
}

export function setPointsLoaded(pointsLoaded) {
  return {
    type: ActionTypes.setPointsLoaded,
    pointsLoaded,
  };
}

export function setChoresLoaded(choresLoaded) {
  return {
    type: ActionTypes.setChoresLoaded,
    choresLoaded,
  };
}

export function signOut() {
  return () => {
    auth.signOut();
  };
}
