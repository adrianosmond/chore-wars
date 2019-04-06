import { ActionTypes } from 'constants/constants';
import { DefaultAvatar } from 'constants/avatars';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { database } from 'utils/database';
import playersReducer, {
  setPlayers, setPlayerName, setPlayerAvatar, loadPlayers,
} from './playersReducer';

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
const player = Object.keys(players)[0];
const avatar = {
  ...DefaultAvatar,
  topType: 'NoHair',
};

describe('Player Actions', () => {
  it('can dispatch setPlayers', () => {
    expect(setPlayers(players)).toEqual({
      type: ActionTypes.setPlayers,
      players,
    });
  });

  it('can dispatch setPlayerName', () => {
    expect(setPlayerName(player, name)).toEqual({
      type: ActionTypes.setPlayerName,
      player,
      name,
    });
  });

  it('can dispatch setPlayerAvatar', () => {
    expect(setPlayerAvatar(player, avatar)).toEqual({
      type: ActionTypes.setPlayerAvatar,
      player,
      avatar,
    });
  });

  it('can dispatch loadPlayers', () => {
    database.ref().set(data);
    const store = mockStore();
    return store.dispatch(loadPlayers(gameId)).then(() => {
      expect(store.getActions()).toEqual([
        { type: ActionTypes.setPlayers, players },
        { type: ActionTypes.setPlayersLoaded, playersLoaded: true },
      ]);
    });
  });
});

describe('playersReducer', () => {
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
});
