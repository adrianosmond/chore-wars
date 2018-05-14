import { database } from 'lib/firebase';
import { ActionTypes } from 'constants/constants';
import { setPlayersLoaded } from './sessionActions';

export function setPlayerName(player, name, game) {
  return {
    type: ActionTypes.setPlayerName,
    player,
    name,
    game,
  };
}

export function setPlayerAvatar(player, avatar, game) {
  return {
    type: ActionTypes.setPlayerAvatar,
    player,
    avatar,
    game,
  };
}

export function savePlayerName(player, name, game) {
  return {
    type: ActionTypes.savePlayerName,
    player,
    name,
    game,
  };
}

export function savePlayerAvatar(player, avatar, game) {
  return {
    type: ActionTypes.savePlayerAvatar,
    player,
    avatar,
    game,
  };
}

export function setPlayers(players) {
  return {
    type: ActionTypes.setPlayers,
    players,
  };
}

export function loadPlayers(game) {
  return (dispatch) => {
    database.ref(`games/${game}/players`).once('value', (result) => {
      dispatch(setPlayers(result.val()));
      dispatch(setPlayersLoaded(true));
    });
  };
}
