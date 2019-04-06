import { ActionTypes } from 'constants/constants';
import { database } from 'utils/database';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import pointsReducer, { setPoints, loadPoints } from './pointsReducer';

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

describe('pointsReducer', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  it('can dispatch setPoints', () => {
    expect(setPoints(points)).toEqual({
      type: ActionTypes.setPoints,
      points,
    });
  });

  it('can dispatch loadPoints', () => {
    database.ref().set(data);
    const store = mockStore();
    store.dispatch(loadPoints(game));
    expect(store.getActions()).toEqual([
      { type: ActionTypes.setPoints, points },
      { type: ActionTypes.setPointsLoaded, pointsLoaded: true },
    ]);
  });
});

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
    expect(pointsReducer({}, {
      type: ActionTypes.setPoints,
      points,
    })).toEqual(points);
  });
});
