import choresReducer from './choresReducer';
import { ActionTypes } from '../constants/constants';

describe('Chores Reducer', () => {
  it('Should return initial state', () => {
    expect(choresReducer(undefined, {})).toEqual({});
  });

  it('Should be able to add a chore', () => {
    expect(choresReducer({}, {
      type: ActionTypes.addChore,
      newChore: {
        lastDone: 0,
        frequency: 0,
        pointsPerTime: 100,
        title: 'Test Chore',
      },
      game: 'testgame',
      slug: 'test-chore',
    })).toEqual({
      'test-chore': {
        lastDone: 0,
        frequency: 0,
        pointsPerTime: 100,
        title: 'Test Chore',
      }
    });
  });

  it('Should be able to remove a chore', () => {
    expect(choresReducer({
      'test-chore': {
        lastDone: 0,
        frequency: 0,
        pointsPerTime: 100,
        title: 'Test Chore',
      },
    }, {
      type: ActionTypes.removeChore,
      game: 'testgame',
      slug: 'test-chore',
    })).toEqual({});
  });

  it('Should be able to update a chore', () => {
    expect(choresReducer({
      'test-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore',
      },
    }, {
      type: ActionTypes.updateChore,
      slug: 'test-chore',
      newChore: {
        lastDone: 0,
        frequency: 1,
        pointsPerTime: 10,
        title: 'Test Chore',
      },
      newSlug: 'test-chore',
      game: 'testgame',
    })).toEqual({
      'test-chore': {
        lastDone: 0,
        frequency: 1,
        pointsPerTime: 10,
        title: 'Test Chore',
      },
    });
  });

  it('Should be able to rename a chore', () => {
    expect(choresReducer({
      'test-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore',
      },
    }, {
      type: ActionTypes.updateChore,
      slug: 'test-chore',
      newChore: {
        lastDone: 0,
        frequency: 1,
        pointsPerTime: 10,
        title: 'Test Chore',
      },
      newSlug: 'renamed-chore',
      game: 'testgame',
    })).toEqual({
      'renamed-chore': {
        lastDone: 0,
        frequency: 1,
        pointsPerTime: 10,
        title: 'Test Chore',
      },
    });
  });
});
