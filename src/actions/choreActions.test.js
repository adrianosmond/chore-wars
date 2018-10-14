import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { database } from 'lib/firebase';
import { ActionTypes } from 'constants/constants';
import * as choreActions from './choreActions';

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

const user = 'test-user';
const slug = 'test-chore';
const time = new Date().getTime();
const chore = {
  frequency: 1,
  lastDone: time,
  pointsPerTime: 100,
  title: 'Test Chore',
};

const processedChore = {
  ...chore,
  slug,
  currentPoints: 100,
};

const processedPausedChore = {
  ...chore,
  timePaused: 1000,
  slug,
  currentPoints: 100,
};

const processedEnablingChore = {
  ...chore,
  enables: 'chore-2',
  slug,
  currentPoints: 100,
};

describe('Chore Actions', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  it('can dispatch addChore', () => {
    expect(choreActions.addChore(chore, game, slug)).toEqual({
      type: ActionTypes.addChore,
      newChore: chore,
      game,
      slug,
    });
  });

  it('can dispatch resetDoneDate', () => {
    expect(choreActions.resetDoneDate(game, slug, time)).toEqual({
      type: ActionTypes.resetChoreDoneDate,
      game,
      slug,
      time,
    });
  });

  it('can dispatch resetTimePaused', () => {
    expect(choreActions.resetTimePaused(game, slug)).toEqual({
      type: ActionTypes.resetChoreTimePaused,
      game,
      slug,
    });
  });

  it('can dispatch blockChore', () => {
    expect(choreActions.blockChore(game, slug)).toEqual({
      type: ActionTypes.blockChore,
      game,
      slug,
    });
  });

  it('can dispatch unblockChore', () => {
    expect(choreActions.unblockChore(game, slug)).toEqual({
      type: ActionTypes.unblockChore,
      game,
      slug,
    });
  });

  it('can dispatch updateChore', () => {
    expect(choreActions.updateChore(slug, chore, 'new-chore', game)).toEqual({
      type: ActionTypes.updateChore,
      slug,
      newChore: chore,
      newSlug: 'new-chore',
      game,
    });
  });

  it('can dispatch makeChain', () => {
    expect(choreActions.makeChain(game, ['chore-1', 'chore-2'])).toEqual({
      type: ActionTypes.makeChain,
      game,
      chain: ['chore-1', 'chore-2'],
    });
  });

  it('can dispatch breakChain', () => {
    expect(choreActions.breakChain(game, slug)).toEqual({
      type: ActionTypes.breakChain,
      game,
      slug,
    });
  });

  it('can dispatch removeChore', () => {
    const store = mockStore();
    store.dispatch(choreActions.removeChore(game, slug));
    expect(store.getActions()).toEqual([
      { type: ActionTypes.breakChain, game, slug },
      { type: ActionTypes.removeChore, game, slug },
    ]);
  });

  it('can dispatch setChores', () => {
    expect(choreActions.setChores({ chore1: chore, chore2: chore })).toEqual({
      type: ActionTypes.setChores,
      chores: { chore1: chore, chore2: chore },
    });
  });

  it('can dispatch addToTimePaused', () => {
    const timePaused = 1000;
    expect(choreActions.addToTimePaused(game, slug, timePaused)).toEqual({
      type: ActionTypes.addToChorePausedTime,
      game,
      slug,
      timePaused,
    });
  });

  it('can dispatch loadChores', () => {
    database.ref().set(data);
    const store = mockStore();
    store.dispatch(choreActions.loadChores(game));
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
    store.dispatch(choreActions.loadChores(game));
    expect(store.getActions()).toEqual([
      { type: ActionTypes.setChores, chores: {} },
      { type: ActionTypes.setChoresLoaded, choresLoaded: true },
    ]);
  });

  it('can dispatch completeChore', () => {
    const store = mockStore();
    store.dispatch(choreActions.completeChore(processedChore, user, game, time));
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.resetChoreDoneDate, game, slug, time,
      },
      {
        type: ActionTypes.addPoints, user, points: 100, game,
      },
    ]);
  });

  it('can dispatch completeChore without a time', () => {
    const store = mockStore();
    store.dispatch(choreActions.completeChore(processedChore, user, game));
    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe(ActionTypes.resetChoreDoneDate);
    expect(actions[0].game).toBe(game);
    expect(actions[0].slug).toBe(slug);
    expect(actions[0]).toHaveProperty('time');
    expect(typeof actions[0].time).toBe('number');
    expect(actions[1]).toEqual({
      type: ActionTypes.addPoints, user, points: 100, game,
    });
  });

  it('can dispatch completeChore for an enabling chore', () => {
    const store = mockStore();
    store.dispatch(choreActions.completeChore(processedEnablingChore, user, game, time));
    jest.runAllTimers();
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.resetChoreDoneDate, game, slug, time,
      },
      {
        type: ActionTypes.blockChore, game, slug,
      },
      {
        type: ActionTypes.addPoints, user, points: 100, game,
      },
      {
        type: ActionTypes.unblockChore, game, slug: processedEnablingChore.enables,
      },
    ]);
  });

  it('can dispatch completeChore for a chore than has been paused', () => {
    const store = mockStore();
    store.dispatch(choreActions.completeChore(processedPausedChore, user, game, time));
    expect(store.getActions()).toEqual([
      {
        type: ActionTypes.resetChoreDoneDate, game, slug, time,
      },
      {
        type: ActionTypes.resetChoreTimePaused, game, slug,
      },
      {
        type: ActionTypes.addPoints, user, points: 100, game,
      },
    ]);
  });
});
