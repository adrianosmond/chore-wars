import pointsReducer from './pointsReducer';
import { ActionTypes, MAX_POINT_DIFFERENCE } from '../constants/constants';

describe('Points Reducer', () => {
  it('Should return initial state', () => {
    expect(pointsReducer(undefined, {})).toEqual({});
  });

  it('Should return state if it gets an unknown action', () => {
    expect(pointsReducer({
      test1: {
        name: 'Test 1',
        points: 100,
      },
    }, {
      type: 'UNKNOWN_ACTION',
    })).toEqual({
      test1: {
        name: 'Test 1',
        points: 100,
      },
    });
  });

  it('Should be able to add points', () => {
    expect(pointsReducer({
      test1: {
        name: 'Test 1',
        points: 100,
      },
    }, {
      type: ActionTypes.addPoints,
      user: 'test1',
      points: 100,
      game: 'testgame',
    })).toEqual({
      test1: {
        name: 'Test 1',
        points: 200,
      },
    });
  });
  
  it('Should be able to claim a prize', () => {
    expect(pointsReducer({
      test1: {
        name: 'Test 1',
        points: 100 + MAX_POINT_DIFFERENCE,
        isOwed: 0,
      },
    }, {
      type: ActionTypes.claimPrize,
      user: 'test1',
      game: 'testgame',
    })).toEqual({
      test1: {
        name: 'Test 1',
        points: 100,
        isOwed: 1,
      },
    });
  });

  it('Should be able to pay a debt', () => {
    expect(pointsReducer({
      test1: {
        name: 'Test 1',
        points: 100,
        isOwed: 1,
      },
    }, {
      type: ActionTypes.paidDebt,
      user: 'test1',
      game: 'testgame',
    })).toEqual({
      test1: {
        name: 'Test 1',
        points: 100,
        isOwed: 0,
      },
    });
  });
});
