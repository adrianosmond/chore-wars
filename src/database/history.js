import { database } from './index';

export const getChoreCompletions = (game, id) =>
  database
    .ref(`games/${game}/history/${id}`)
    .orderByChild('type')
    .equalTo('CHORE_COMPLETED')
    .once('value')
    .then(result => {
      const items = result.val();
      if (!items) return [];
      return Object.entries(items)
        .map(([key, values]) => ({ key, ...values }))
        .reverse();
    });

export const getChoreCompletionRatio = (game, id, players) => {
  return database
    .ref(`games/${game}/history/completions/${id}`)
    .once('value')
    .then(result => {
      const items = result.val();
      return players.map(p => ({
        ...p,
        completions: items[p.id] || 0,
      }));
    });
};

export const getChoreTimeDifferences = (game, id) =>
  database
    .ref(`games/${game}/history/timeDifferences/${id}`)
    .once('value')
    .then(result => Object.values(result.val() || []));

export const getChoreEdits = (game, id) =>
  database
    .ref(`games/${game}/history/${id}`)
    .orderByChild('type')
    .equalTo('CHORE_EDITED')
    .once('value')
    .then(result => {
      const items = result.val();
      if (!items) return [];
      return Object.entries(items)
        .map(([key, values]) => ({ key, ...values }))
        .reverse();
    });
