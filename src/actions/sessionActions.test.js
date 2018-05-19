import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { database, auth } from 'lib/firebase';
import * as utils from 'constants/utils';
import { ActionTypes, DEFAULT_POINTS_DATA } from 'constants/constants';
import { DefaultAvatar } from 'constants/avatars';
import * as sessionActions from './sessionActions';

const authUser = 'fake-auth-user';
const game = 'fake-game';
const joinCode = 'joinCode';
const mockStore = configureMockStore([thunk]);

describe('Session Actions', () => {
  it('can dispatch setAuthUser', () => {
    expect(sessionActions.setAuthUser(authUser)).toEqual({
      type: ActionTypes.setAuthUser,
      authUser,
    });
  });

  it('can dispatch setGame', () => {
    expect(sessionActions.setGame(game)).toEqual({
      type: ActionTypes.setGame,
      game,
    });
  });

  it('can dispatch setPlayersLoaded', () => {
    expect(sessionActions.setPlayersLoaded(true)).toEqual({
      type: ActionTypes.setPlayersLoaded,
      playersLoaded: true,
    });
  });

  it('can dispatch setPointsLoaded', () => {
    expect(sessionActions.setPointsLoaded(true)).toEqual({
      type: ActionTypes.setPointsLoaded,
      pointsLoaded: true,
    });
  });

  it('can dispatch setChoresLoaded', () => {
    expect(sessionActions.setChoresLoaded(true)).toEqual({
      type: ActionTypes.setChoresLoaded,
      choresLoaded: true,
    });
  });

  it('can dispatch signOut', () => {
    const store = mockStore({
      session: {
        authUser,
        game,
        playersLoaded: true,
        pointsLoaded: true,
        choresLoaded: true,
      },
    });

    const expectedActions = [
      { type: ActionTypes.setGame, game: null },
      { type: ActionTypes.setChoresLoaded, choresLoaded: false },
      { type: ActionTypes.setPlayersLoaded, playersLoaded: false },
      { type: ActionTypes.setPointsLoaded, pointsLoaded: false },
    ];

    jest.spyOn(auth, 'signOut').mockReturnValue();
    expect(auth.signOut).toHaveBeenCalledTimes(0);

    store.dispatch(sessionActions.signOut());

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

    return store.dispatch(sessionActions.createGame(userId, playerName)).then(() => {
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

    return store.dispatch(sessionActions.joinGame(userId, joinCode, playerName)).then(() => {
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
