import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { database } from 'lib/firebase';
import { ActionTypes } from 'constants/constants';
import { DefaultAvatar } from 'constants/avatars';
import * as playerActions from './playerActions';

const players = {
  player1: {
    name: 'Player 1',
    avatar: DefaultAvatar,
  },
  player2: {
    name: 'Player 2',
    avatar: DefaultAvatar,
  },
};

const gameId = 'test1';
const data = {
  games: {
    [gameId]: {
      players,
      points: {},
      chores: {},
    },
    test2: {},
  },
};

const mockStore = configureMockStore([thunk]);

const name = 'Player 1';
const game = 'test-game';
const player = players.player1;
const avatar = DefaultAvatar;

describe('Player Actions', () => {
  it('can dispatch setPlayerName', () => {
    expect(playerActions.setPlayerName(player, name, game)).toEqual({
      type: ActionTypes.setPlayerName,
      player,
      name,
      game,
    });
  });

  it('can dispatch setPlayerAvatar', () => {
    expect(playerActions.setPlayerAvatar(player, avatar, game)).toEqual({
      type: ActionTypes.setPlayerAvatar,
      player,
      avatar,
      game,
    });
  });

  it('can dispatch savePlayerName', () => {
    expect(playerActions.savePlayerName(player, name, game)).toEqual({
      type: ActionTypes.savePlayerName,
      player,
      name,
      game,
    });
  });

  it('can dispatch savePlayerAvatar', () => {
    expect(playerActions.savePlayerAvatar(player, avatar, game)).toEqual({
      type: ActionTypes.savePlayerAvatar,
      player,
      avatar,
      game,
    });
  });

  it('can dispatch setPlayers', () => {
    expect(playerActions.setPlayers(players)).toEqual({
      type: ActionTypes.setPlayers,
      players,
    });
  });

  it('can dispatch loadPlayers', () => {
    database.ref().set(data);
    const store = mockStore();
    return store.dispatch(playerActions.loadPlayers(gameId)).then(() => {
      expect(store.getActions()).toEqual([
        { type: ActionTypes.setPlayers, players },
        { type: ActionTypes.setPlayersLoaded, playersLoaded: true },
      ]);
    });
  });
});
