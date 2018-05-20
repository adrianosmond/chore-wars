import { ActionTypes, MAX_POINT_DIFFERENCE } from 'constants/constants';
import { MockFirebase } from 'firebase-mock';
import { database } from 'lib/firebase';
import pointsReducer from './pointsReducer';

describe('Points Reducer', () => {
  it('Should return initial state', () => {
    expect(pointsReducer(undefined, {})).toEqual({});
  });

  it('Should return state if it gets an unknown action', () => {
    expect(pointsReducer({
      test1: {
        isOwed: 0,
        points: 100,
      },
    }, {
      type: 'UNKNOWN_ACTION',
    })).toEqual({
      test1: {
        isOwed: 0,
        points: 100,
      },
    });
  });

  it('Should be able to set points', () => {
    const points = {
      player1: {
        isOwed: 1,
        points: 0,
      },
      player2: {
        isOwed: 0,
        points: 100,
      },
    };
    expect(pointsReducer({}, {
      type: ActionTypes.setPoints,
      points,
    })).toEqual(points);
  });

  it('Should be able to add points', () => {
    expect(pointsReducer({
      test1: {
        isOwed: 0,
        points: 100,
      },
    }, {
      type: ActionTypes.addPoints,
      user: 'test1',
      points: 100,
      game: 'testgame',
    })).toEqual({
      test1: {
        isOwed: 0,
        points: 200,
      },
    });
  });

  it('Should be able to claim a prize', () => {
    expect(pointsReducer({
      test1: {
        points: 100 + MAX_POINT_DIFFERENCE,
        isOwed: 0,
      },
    }, {
      type: ActionTypes.claimPrize,
      user: 'test1',
      game: 'testgame',
    })).toEqual({
      test1: {
        points: 100,
        isOwed: 1,
      },
    });
  });

  it('Should be able to pay a debt', () => {
    expect(pointsReducer({
      test1: {
        points: 100,
        isOwed: 1,
      },
    }, {
      type: ActionTypes.paidDebt,
      user: 'test1',
      game: 'testgame',
    })).toEqual({
      test1: {
        points: 100,
        isOwed: 0,
      },
    });
  });

  it('Should save state after an undo', () => {
    jest.spyOn(MockFirebase.prototype, 'set');
    jest.spyOn(database, 'ref');
    const state = {
      test1: {
        isOwed: 0,
        points: 100,
      },
    };
    expect(pointsReducer(state, {
      type: ActionTypes.saveStatePostUndo,
      game: 'fake-game',
    })).toEqual(state);
    expect(database.ref).toHaveBeenCalledWith('games/fake-game/points/');
    expect(MockFirebase.prototype.set).toHaveBeenCalledWith(state);
  });
});
