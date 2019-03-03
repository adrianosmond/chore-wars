import { ActionTypes, DEFAULT_POINTS_DATA } from 'constants/constants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { database, auth } from 'utils/database';
import * as utils from 'constants/utils';
import sessionReducer, {
  INITIAL_STATE, setAuthUser, setGame, setPlayersLoaded, setPointsLoaded, setChoresLoaded,
  setHoliday, loadHoliday, startHoliday, stopHoliday,
  signOut, createGame, joinGame,
} from './sessionReducer';

const authUser = {
  uid: 'fake-user',
};
const game = {
  gameId: 'fake-game',
};
const gameState = {
  ...INITIAL_STATE,
  authUser,
  game,
  playersLoaded: true,
  pointsLoaded: true,
  choresLoaded: true,
};

// const authUser = 'fake-auth-user';
// const game = 'fake-game';
const joinCode = 'joinCode';
const mockStore = configureMockStore([thunk]);

describe('Session Actions', () => {
  it('can dispatch setAuthUser', () => {
    expect(setAuthUser(authUser)).toEqual({
      type: ActionTypes.setAuthUser,
      authUser,
    });
  });

  it('can dispatch setGame', () => {
    expect(setGame(game)).toEqual({
      type: ActionTypes.setGame,
      game,
    });
  });

  it('can dispatch setPlayersLoaded', () => {
    expect(setPlayersLoaded(true)).toEqual({
      type: ActionTypes.setPlayersLoaded,
      playersLoaded: true,
    });
  });

  it('can dispatch setPointsLoaded', () => {
    expect(setPointsLoaded(true)).toEqual({
      type: ActionTypes.setPointsLoaded,
      pointsLoaded: true,
    });
  });

  it('can dispatch setChoresLoaded', () => {
    expect(setChoresLoaded(true)).toEqual({
      type: ActionTypes.setChoresLoaded,
      choresLoaded: true,
    });
  });

  it('can dispatch setHoliday', () => {
    expect(setHoliday(true)).toEqual({
      type: ActionTypes.setHoliday,
      holiday: true,
    });
  });

  it('can dispatch loadHoliday', () => {
    const holiday = new Date().getTime();
    database.ref().set({
      games: {
        [game]: {
          holiday,
        },
      },
    });

    const store = mockStore();
    return store.dispatch(loadHoliday(game)).then(() => {
      expect(store.getActions()).toEqual([
        { type: ActionTypes.setHoliday, holiday },
      ]);
    });
  });

  it('can dispatch startHoliday', () => {
    const holiday = new Date().getTime();
    database.ref().set({
      games: {
        [game]: {},
      },
    });

    const store = mockStore();
    return store.dispatch(startHoliday(game, holiday)).then(() => {
      expect(store.getActions()).toEqual([
        { type: ActionTypes.setHoliday, holiday },
      ]);

      const data = database.ref(`games/${game}`).getData();
      expect(data).toHaveProperty('holiday');
      expect(data.holiday).toBe(holiday);
    });
  });

  it('can dispatch stopHoliday', () => {
    const holiday = new Date().getTime() - 10000;
    database.ref().set({
      games: {
        [game]: {
          holiday,
          chores: {
            'chore-1': {
              frequency: 1,
              timePaused: 0,
            },
            'chore-2': {
              frequency: 0,
            },
          },
        },
      },
    });

    const store = mockStore();
    return store.dispatch(stopHoliday(game, holiday, holiday + 10000)).then(() => {
      const data = database.ref().getData();

      const gameData = data.games[game];
      expect(gameData).not.toHaveProperty('holiday');
      expect(gameData).toHaveProperty('chores');

      const gameChores = gameData.chores;
      expect(gameChores).toHaveProperty('chore-1');
      expect(gameChores['chore-1']).toHaveProperty('timePaused');
      expect(gameChores).toHaveProperty('chore-2');
      expect(gameChores['chore-2']).not.toHaveProperty('timePaused');

      expect(store.getActions()).toEqual([
        {
          type: ActionTypes.addToChorePausedTime, game, slug: 'chore-1', timePaused: 10000,
        },
        { type: ActionTypes.setHoliday, holiday: false },
      ]);
    });
  });

  it('can dispatch signOut', () => {
    const store = mockStore({
      session: {
        authUser,
        game,
        holiday: true,
        playersLoaded: true,
        pointsLoaded: true,
        choresLoaded: true,
      },
    });

    const expectedActions = [
      { type: ActionTypes.setGame, game: null },
      { type: ActionTypes.setHoliday, holiday: false },
      { type: ActionTypes.setChoresLoaded, choresLoaded: false },
      { type: ActionTypes.setPlayersLoaded, playersLoaded: false },
      { type: ActionTypes.setPointsLoaded, pointsLoaded: false },
    ];

    jest.spyOn(auth, 'signOut').mockReturnValue();
    expect(auth.signOut).toHaveBeenCalledTimes(0);

    store.dispatch(signOut());

    expect(store.getActions()).toEqual(expectedActions);
    expect(auth.signOut).toHaveBeenCalledTimes(1);
  });


  it('can dispatch createGame', () => {
    jest.spyOn(utils, 'createJoinCode').mockImplementation(() => joinCode);
    const store = mockStore();
    const userId = 'player1';
    const playerName = 'Player 1';

    database.ref().set({
      games: {},
      joinCodes: {},
      users: {},
    });

    return store.dispatch(createGame(userId, playerName)).then(() => {
      const data = database.ref().getData();
      expect(data).toHaveProperty('games');
      expect(Object.keys(data.games)).toHaveLength(1);
      const gameKey = Object.keys(data.games)[0];
      const gameData = data.games[gameKey];
      expect(gameData).toHaveProperty('gameIncomplete');
      expect(gameData.gameIncomplete).toBe(true);

      expect(gameData).toHaveProperty('players');
      expect(gameData.players).toHaveProperty(userId);
      const playerData = gameData.players[userId];
      expect(playerData).toEqual(utils.generatePlayerData(playerName, joinCode));

      expect(gameData).toHaveProperty('points');
      expect(gameData.points).toHaveProperty(userId);
      const pointsData = gameData.points[userId];
      expect(pointsData).toEqual(DEFAULT_POINTS_DATA);

      expect(data).toHaveProperty('joinCodes');
      expect(data.joinCodes).toEqual({
        [joinCode]: gameKey,
      });

      expect(data).toHaveProperty('users');
      expect(data.users).toHaveProperty(userId);
      expect(data.users).toEqual({
        [userId]: {
          gameId: gameKey,
        },
      });

      expect(store.getActions()).toEqual([
        { type: ActionTypes.setGame, game: { gameId: gameKey } },
      ]);
    });
  });

  it('can dispatch joinGame', () => {
    const store = mockStore();
    const userId = 'player2';
    const playerName = 'Player 2';
    const player1 = {
      gameId: game,
    };

    database.ref().set({
      games: {
        [game]: {
          gameIncomplete: true,
          players: {
            player1: utils.generatePlayerData('Player 1', joinCode),
          },
          points: {
            player1: DEFAULT_POINTS_DATA,
          },
        },
      },
      joinCodes: {
        [joinCode]: game,
      },
      users: {
        player1,
      },
    });

    return store.dispatch(joinGame(userId, joinCode, playerName)).then(() => {
      expect(store.getActions()).toEqual([
        { type: ActionTypes.setGame, game: { gameId: game } },
      ]);

      const data = database.ref().getData();
      expect(data).toHaveProperty('games');
      expect(Object.keys(data.games).length).toBe(1);
      const gameKey = Object.keys(data.games)[0];
      const gameData = data.games[gameKey];
      expect(gameData).not.toHaveProperty('gameIncomplete');

      expect(gameData).toHaveProperty('players');
      expect(gameData.players).toHaveProperty(userId);
      expect(Object.keys(gameData.players)).toHaveLength(2);
      const playerData = gameData.players[userId];
      expect(playerData).toEqual(utils.generatePlayerData(playerName));

      expect(gameData).toHaveProperty('points');
      expect(gameData.points).toHaveProperty(userId);
      const pointsData = gameData.points[userId];
      expect(pointsData).toEqual(DEFAULT_POINTS_DATA);

      expect(data).not.toHaveProperty('joinCodes');

      expect(data).toHaveProperty('users');
      expect(Object.keys(data.users)).toHaveLength(2);
      expect(data.users).toHaveProperty(userId);
      expect(data.users).toEqual({
        player1,
        [userId]: {
          gameId: gameKey,
        },
      });
    });
  });
});

describe('Session Reducer', () => {
  it('Should return initial state', () => {
    expect(sessionReducer(undefined, {})).toEqual(INITIAL_STATE);
  });

  it('Should return state if it gets an unknown action', () => {
    expect(sessionReducer(gameState, {
      type: 'UNKNOWN_ACTION',
    })).toEqual(gameState);
  });

  it('Should be able to set a user', () => {
    expect(sessionReducer(INITIAL_STATE, {
      type: ActionTypes.setAuthUser,
      authUser,
    })).toEqual({
      ...INITIAL_STATE,
      authUser,
    });
  });

  it('Should be able to set a game', () => {
    expect(sessionReducer(INITIAL_STATE, {
      type: ActionTypes.setGame,
      game,
    })).toEqual({
      ...INITIAL_STATE,
      game,
    });
  });

  it('Should be able to set chores loaded', () => {
    expect(sessionReducer(INITIAL_STATE, {
      type: ActionTypes.setChoresLoaded,
      choresLoaded: true,
    })).toEqual({
      ...INITIAL_STATE,
      choresLoaded: true,
    });
  });

  it('Should be able to set points loaded', () => {
    expect(sessionReducer(INITIAL_STATE, {
      type: ActionTypes.setPointsLoaded,
      pointsLoaded: true,
    })).toEqual({
      ...INITIAL_STATE,
      pointsLoaded: true,
    });
  });

  it('Should be able to set players loaded', () => {
    expect(sessionReducer(INITIAL_STATE, {
      type: ActionTypes.setPlayersLoaded,
      playersLoaded: true,
    })).toEqual({
      ...INITIAL_STATE,
      playersLoaded: true,
    });
  });

  it('Should be able to set a holiday', () => {
    expect(sessionReducer(INITIAL_STATE, {
      type: ActionTypes.setHoliday,
      holiday: true,
    })).toEqual({
      ...INITIAL_STATE,
      holiday: true,
    });
  });
});
