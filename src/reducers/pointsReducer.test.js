import pointsReducer from './pointsReducer';
import { ActionTypes } from '../constants/constants';

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
});