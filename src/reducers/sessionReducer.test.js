import { ActionTypes } from 'constants/constants';
import sessionReducer, { INITIAL_STATE } from './sessionReducer';

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
