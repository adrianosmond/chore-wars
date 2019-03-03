import { database } from 'utils/database';
import { ActionTypes } from 'constants/constants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import choresReducer, { setChores, loadChores } from './choresReducer';

jest.useFakeTimers();

const game = 'my-game';
const chores = {
  first: {
    frequency: 7,
    lastDone: 0,
    pointsPerTime: 50,
    title: 'First',
  },
  second: {
    frequency: 0,
    lastDone: 10,
    pointsPerTime: 10,
    title: 'Second',
  },
};

const data = {
  games: {
    [game]: {
      players: {},
      points: {},
      chores,
    },
    test2: {},
  },
};

const mockStore = configureMockStore([thunk]);

const time = new Date().getTime();
const chore = {
  frequency: 1,
  lastDone: time,
  pointsPerTime: 100,
  title: 'Test Chore',
};

describe('Chore Actions', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });


  it('can dispatch setChores', () => {
    expect(setChores({ chore1: chore, chore2: chore })).toEqual({
      type: ActionTypes.setChores,
      chores: { chore1: chore, chore2: chore },
    });
  });

  it('can dispatch loadChores', () => {
    database.ref().set(data);
    const store = mockStore();
    store.dispatch(loadChores(game));
    expect(store.getActions()).toEqual([
      { type: ActionTypes.setChores, chores },
      { type: ActionTypes.setChoresLoaded, choresLoaded: true },
    ]);
  });

  it('can dispatch loadChores when there are no chores', () => {
    const dataWithoutChores = JSON.parse(JSON.stringify(data));
    delete dataWithoutChores.games[game].chores;
    database.ref().set(dataWithoutChores);
    const store = mockStore();
    store.dispatch(loadChores(game));
    expect(store.getActions()).toEqual([
      { type: ActionTypes.setChores, chores: {} },
      { type: ActionTypes.setChoresLoaded, choresLoaded: true },
    ]);
  });
});

describe('Chores Reducer', () => {
  it('Should return initial state', () => {
    expect(choresReducer(undefined, {})).toEqual({});
  });

  it('Should return state if it gets an unknown action', () => {
    expect(choresReducer({
      'test-chore': {
        lastDone: 0,
        frequency: 0,
        pointsPerTime: 100,
        title: 'Test Chore',
      },
    }, {
      type: 'UNKNOWN_ACTION',
    })).toEqual({
      'test-chore': {
        lastDone: 0,
        frequency: 0,
        pointsPerTime: 100,
        title: 'Test Chore',
      },
    });
  });

  it('Should be able to set chores', () => {
    expect(choresReducer({}, {
      type: ActionTypes.setChores,
      chores: {
        'test-chore': {
          lastDone: 0,
          frequency: 0,
          pointsPerTime: 100,
          title: 'Test Chore',
        },
      },
    })).toEqual({
      'test-chore': {
        lastDone: 0,
        frequency: 0,
        pointsPerTime: 100,
        title: 'Test Chore',
      },
    });
  });
});
