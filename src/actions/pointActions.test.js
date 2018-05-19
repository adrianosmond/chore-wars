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

describe('Point Actions', () => {
  test('addPointsToUser', () => {
    expect(pointActions.addPointsToUser(user, 100, game)).toEqual({
      type: ActionTypes.addPoints,
      user,
      points: 100,
      game,
    });
  });

  test('claimPrize', () => {
    expect(pointActions.claimPrize(user, game)).toEqual({
      type: ActionTypes.claimPrize,
      user,
      game,
    });
  });

  test('paidDebt', () => {
    expect(pointActions.paidDebt(user, game)).toEqual({
      type: ActionTypes.paidDebt,
      user,
      game,
    });
  });

  test('setPoints', () => {
    expect(pointActions.setPoints(points)).toEqual({
      type: ActionTypes.setPoints,
      points,
    });
  });

  test('loadPoints', () => {
    // expect(pointActions.loadPoints(game)).toEqual({
    //   database.ref(`games/${game}/points`).once('value', (result) => {
    //     dispatch(setPoints(result.val()));
    //     dispatch(setPointsLoaded(true));
    //   });
    // };
    // });
  });
});
