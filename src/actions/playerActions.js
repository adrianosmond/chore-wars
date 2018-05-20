import { database } from 'lib/firebase';
import { ActionTypes } from 'constants/constants';
import { setPlayersLoaded } from './sessionActions';

export function setPlayers(players) {
  return {
    type: ActionTypes.setPlayers,
    players,
  };
}

export function setPlayerName(player, name) {
  return {
    type: ActionTypes.setPlayerName,
    player,
    name,
  };
}

export function setPlayerAvatar(player, avatar) {
  return {
    type: ActionTypes.setPlayerAvatar,
    player,
    avatar,
  };
}

export function savePlayerName(player, name, game) {
  return () =>
    database.ref(`games/${game}/players/${player}/name`).set(name);
}

export function savePlayerAvatar(player, avatar, game) {
  return () =>
    database.ref(`games/${game}/players/${player}/avatar`).set(avatar);
}

export function loadPlayers(game) {
  return dispatch => database.ref(`games/${game}/players`).once('value', (result) => {
    dispatch(setPlayers(result.val()));
    dispatch(setPlayersLoaded(true));
  });
}
