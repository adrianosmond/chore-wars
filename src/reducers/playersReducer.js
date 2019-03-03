import { ActionTypes } from 'constants/constants';

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
