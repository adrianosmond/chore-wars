import { ActionTypes } from 'constants/constants';
import { DefaultAvatar } from 'constants/avatars';
import playersReducer from './playersReducer';

describe('Players Reducer', () => {
  const player1 = {
    name: 'Player 1',
    avatar: DefaultAvatar,
  };
  const player2 = {
    name: 'Player 1',
    avatar: DefaultAvatar,
  };
  const players = {
    player1,
    player2,
  };

  const player = 'player1';

  const newName = 'Jeff';
  const newAvatar = {
    ...DefaultAvatar,
    topType: 'NoHair',
  };

  it('Should return initial state', () => {
    expect(playersReducer(undefined, {})).toEqual({});
  });

  it('Should return state if it gets an unknown action', () => {
    expect(playersReducer(players, {
      type: 'UNKNOWN_ACTION',
    })).toEqual(players);
  });

  it('Should be able to set players', () => {
    expect(playersReducer({}, {
      type: ActionTypes.setPlayers,
      players,
    })).toEqual(players);
  });

  it('Should be able to set a player name', () => {
    expect(playersReducer(players, {
      type: ActionTypes.setPlayerName,
      player,
      name: newName,
    })).toEqual({
      player1: {
        name: newName,
        avatar: DefaultAvatar,
      },
      player2,
    });
  });

  it('Should be able to set an avatar', () => {
    expect(playersReducer(players, {
      type: ActionTypes.setPlayerAvatar,
      player,
      avatar: newAvatar,
    })).toEqual({
      player1: {
        name: 'Player 1',
        avatar: newAvatar,
      },
      player2,
    });
  });
});
