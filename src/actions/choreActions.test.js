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

  it('can dispatch setChores', () => {
    expect(choreActions.setChores({ chore1: chore, chore2: chore })).toEqual({
      type: ActionTypes.setChores,
      chores: { chore1: chore, chore2: chore },
    });
  });

  it test('can dispatch loadChores', () => {
  //   expect(choreActions.loadChores()).toEqual({

  //   });
  // });

  it test('can dispatch completeChore', () => {
  //   expect(choreActions.completeChore()).toEqual({

  //   });
  // });
});

