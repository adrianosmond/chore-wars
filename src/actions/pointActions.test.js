import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { database } from 'lib/firebase';
import { ActionTypes } from 'constants/constants';
import * as pointActions from './pointActions';

const user = 'test-user';
const points = {
  test1: {
    points: 100,
    isOwed: 0,
  },
  test2: {
    points: 100,
    isOwed: 1,
  },
};
const game = 'test-game';
const data = {
  games: {
    [game]: {
      players: {},
      points,
      chores: {},
    },
    test2: {},
  },
};

const mockStore = configureMockStore([thunk]);

describe('Point Actions', () => {
  it('can dispatch addPointsToUser', () => {
    expect(pointActions.addPointsToUser(user, 100, game)).toEqual({
      type: ActionTypes.addPoints,
      user,
      points: 100,
      game,
    });
  });

  it('can dispatch claimPrize', () => {
    expect(pointActions.claimPrize(user, game)).toEqual({
      type: ActionTypes.claimPrize,
      user,
      game,
    });
  });

  it('can dispatch paidDebt', () => {
    expect(pointActions.paidDebt(user, game)).toEqual({
      type: ActionTypes.paidDebt,
      user,
      game,
    });
  });

  it('can dispatch setPoints', () => {
    expect(pointActions.setPoints(points)).toEqual({
      type: ActionTypes.setPoints,
      points,
    });
  });

  it('can dispatch loadPoints', () => {
    database.ref().set(data);
    const store = mockStore();
    return store.dispatch(pointActions.loadPoints(game)).then(() => {
      expect(store.getActions()).toEqual([
        { type: ActionTypes.setPoints, points },
        { type: ActionTypes.setPointsLoaded, pointsLoaded: true },
      ]);
    });
  });
});
