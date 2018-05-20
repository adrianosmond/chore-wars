import { database } from 'lib/firebase';
import { ActionTypes } from 'constants/constants';

export default function playersReducer(state = { }, action) {
  const newState = JSON.parse(JSON.stringify(state));
  const { player, game } = action;

  switch (action.type) {
    case ActionTypes.setPlayers:
      return {
        ...action.players,
      };

    case ActionTypes.setPlayerName:
      newState[player].name = action.name;
      return newState;

    case ActionTypes.setPlayerAvatar:
      newState[player].avatar = action.avatar;
      return newState;

    default:
      return state;
  }
}
