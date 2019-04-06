import { ActionTypes } from 'constants/constants';
import { database } from 'utils/database';
import { setPlayersLoaded } from './sessionReducer';

export const setPlayers = players => ({
  type: ActionTypes.setPlayers,
  players,
});

export const loadPlayers = game => dispatch => database.ref(`games/${game}/players`)
  .once('value', (result) => {
    dispatch(setPlayers(result.val()));
    dispatch(setPlayersLoaded(true));
  });

export default function playersReducer(state = { }, action) {
  const { player } = action;

  switch (action.type) {
    case ActionTypes.setPlayers:
      return {
        ...action.players,
      };

    case ActionTypes.setPlayerName:
      return {
        ...state,
        [player]: {
          ...state[player],
          name: action.name,
        },
      };

    case ActionTypes.setPlayerAvatar:
      return {
        ...state,
        [player]: {
          ...state[player],
          name: action.name,
        },
      };

    default:
      return state;
  }
}
