// import { database } from 'lib/firebase';
import { ActionTypes } from 'constants/constants';
import * as choreActions from './choreActions';

describe('Chore Actions', () => {
  const game = 'my-game';
  const slug = 'test-chore';
  const time = new Date().getTime();
  const chore = {
    frequency: 1,
    lastDone: time,
    pointsPerTime: 100,
    title: 'Test Chore',
  };

  test('addChore', () => {
    expect(choreActions.addChore(chore, game, slug)).toEqual({
      type: ActionTypes.addChore,
      newChore: chore,
      game,
      slug,
    });
  });

  test('resetDoneDate', () => {
    expect(choreActions.resetDoneDate(game, slug, time)).toEqual({
      type: ActionTypes.resetChoreDoneDate,
      game,
      slug,
      time,
    });
  });

  test('blockChore', () => {
    expect(choreActions.blockChore(game, slug)).toEqual({
      type: ActionTypes.blockChore,
      game,
      slug,
    });
  });

  test('unblockChore', () => {
    expect(choreActions.unblockChore(game, slug)).toEqual({
      type: ActionTypes.unblockChore,
      game,
      slug,
    });
  });

  test('updateChore', () => {
    expect(choreActions.updateChore(slug, chore, 'new-chore', game)).toEqual({
      type: ActionTypes.updateChore,
      slug,
      newChore: chore,
      newSlug: 'new-chore',
      game,
    });
  });

  test('makeChain', () => {
    expect(choreActions.makeChain(game, ['chore-1', 'chore-2'])).toEqual({
      type: ActionTypes.makeChain,
      game,
      chain: ['chore-1', 'chore-2'],
    });
  });

  test('breakChain', () => {
    expect(choreActions.breakChain(game, slug)).toEqual({
      type: ActionTypes.breakChain,
      game,
      slug,
    });
  });

  test('setChores', () => {
    expect(choreActions.setChores({ chore1: chore, chore2: chore })).toEqual({
      type: ActionTypes.setChores,
      chores: { chore1: chore, chore2: chore },
    });
  });

  // test('loadChores', () => {
  //   expect(choreActions.loadChores()).toEqual({

  //   });
  // });

  // test('completeChore', () => {
  //   expect(choreActions.completeChore()).toEqual({

  //   });
  // });
});

