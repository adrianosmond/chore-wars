import choresReducer from './choresReducer';
import { ActionTypes } from '../constants/constants';

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
      },
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

  it('Should be able to update a chore chain if renaming a chore', () => {
    expect(choresReducer({
      'test-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore',
        enables: 'dependent-chore',
      },
      'dependent-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Dependent Chore',
        enables: 'test-chore',
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
      'dependent-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Dependent Chore',
        enables: 'renamed-chore',
      },
    });
  });

  it('Should be able to mark a chore as done', () => {
    const time = new Date().getTime();
    expect(choresReducer({
      'test-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore',
      },
    }, {
      type: ActionTypes.resetChoreDoneDate,
      slug: 'test-chore',
      game: 'testgame',
      time,
    })).toEqual({
      'test-chore': {
        lastDone: time,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore',
      },
    });
  });

  it('Should be able to mark as blocked', () => {
    expect(choresReducer({
      'test-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore',
        isWaiting: false,
      },
    }, {
      type: ActionTypes.blockChore,
      slug: 'test-chore',
      game: 'testgame',
    })).toEqual({
      'test-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore',
        isWaiting: true,
      },
    });
  });

  it('Should be able to unblock a chore', () => {
    expect(choresReducer({
      'test-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore',
        isWaiting: true,
      },
    }, {
      type: ActionTypes.unblockChore,
      slug: 'test-chore',
      game: 'testgame',
    })).toEqual({
      'test-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore',
        isWaiting: false,
      },
    });
  });

  it('Should be able to make a chain', () => {
    expect(choresReducer({
      'test-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore',
      },
      'test-chore-2': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore 2',
      },
      'test-chore-3': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore 3',
      },
    }, {
      type: ActionTypes.makeChain,
      game: 'testgame',
      chain: ['test-chore-2', 'test-chore'],
    })).toEqual({
      'test-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore',
        isWaiting: true,
        enables: 'test-chore-2',
      },
      'test-chore-2': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore 2',
        isWaiting: false,
        enables: 'test-chore',
      },
      'test-chore-3': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore 3',
      },
    });
  });

  it('Should be able to break a chain', () => {
    expect(choresReducer({
      'test-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore',
        isWaiting: true,
        enables: 'test-chore-2',
      },
      'test-chore-2': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore 2',
        isWaiting: false,
        enables: 'test-chore',
      },
      'test-chore-3': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore 3',
      },
    }, {
      type: ActionTypes.breakChain,
      game: 'testgame',
      slug: 'test-chore',
    })).toEqual({
      'test-chore': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore',
      },
      'test-chore-2': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore 2',
      },
      'test-chore-3': {
        lastDone: 0,
        frequency: 10,
        pointsPerTime: 100,
        title: 'Test Chore 3',
      },
    });
  });
});
