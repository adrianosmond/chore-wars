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

const name = 'Jeff';
const game = 'test-game';
const player = Object.keys(players)[0];
const avatar = {
  ...DefaultAvatar,
  topType: 'NoHair',
};

describe('Player Actions', () => {
  it('can dispatch setPlayers', () => {
    expect(playerActions.setPlayers(players)).toEqual({
      type: ActionTypes.setPlayers,
      players,
    });
  });

  it('can dispatch setPlayerName', () => {
    expect(playerActions.setPlayerName(player, name)).toEqual({
      type: ActionTypes.setPlayerName,
      player,
      name,
    });
  });

  it('can dispatch setPlayerAvatar', () => {
    expect(playerActions.setPlayerAvatar(player, avatar)).toEqual({
      type: ActionTypes.setPlayerAvatar,
      player,
      avatar,
    });
  });

  it('can dispatch savePlayerName', () => {
    database.ref().set(data);
    const store = mockStore();
    return store.dispatch(playerActions.savePlayerName(player, name, game)).then(() => {
      expect(store.getActions()).toEqual([]);
      const newData = database.ref(`games/${game}/players/${player}/name`).getData();
      expect(newData).toEqual(name);
    });
  });

  it('can dispatch savePlayerAvatar', () => {
    database.ref().set(data);
    const store = mockStore();
    return store.dispatch(playerActions.savePlayerAvatar(player, avatar, game)).then(() => {
      expect(store.getActions()).toEqual([]);
      const newData = database.ref(`games/${game}/players/${player}/avatar`).getData();
      expect(newData).toEqual(avatar);
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
