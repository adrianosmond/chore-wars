import { database } from 'utils/database';
import { ActionTypes } from 'constants/constants';
import { setPlayersLoaded } from './sessionActions';

export const setPlayers = players => ({
  type: ActionTypes.setPlayers,
  players,
});

export const setPlayerName = (player, name) => ({
  type: ActionTypes.setPlayerName,
  player,
  name,
});

export const setPlayerAvatar = (player, avatar) => ({
  type: ActionTypes.setPlayerAvatar,
  player,
  avatar,
});

export const loadPlayers = game => dispatch => database.ref(`games/${game}/players`)
  .once('value', (result) => {
    dispatch(setPlayers(result.val()));
    dispatch(setPlayersLoaded(true));
  });
