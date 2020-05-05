import { database } from './index';

const getItemsArrayWithKey = (result) => {
  const items = result.val();
  if (!items) return [];
  return Object.entries(items)
    .map(([key, values]) => ({ key, ...values }))
    .reverse();
};

export const getChoreCompletions = (game, id) =>
  database
    .ref(`games/${game}/history/${id}`)
    .orderByChild('type')
    .equalTo('CHORE_COMPLETED')
    .once('value')
    .then(getItemsArrayWithKey);

export const getChoreCompletionRatio = (game, id, players) => {
  return database
    .ref(`games/${game}/history/completions/${id}`)
    .once('value')
    .then((result) => {
      const items = result.val();
      if (!items) return [];
      return players.map((p) => ({
        ...p,
        completions: items[p.id] || 0,
      }));
    });
};

export const getChoreTimeDifferences = (game, id) =>
  database
    .ref(`games/${game}/history/timeDifferences/${id}`)
    .once('value')
    .then((result) => Object.values(result.val() || []));

export const getChoreEdits = (game, id) =>
  database
    .ref(`games/${game}/history/${id}`)
    .orderByChild('type')
    .equalTo('CHORE_EDITED')
    .once('value')
    .then(getItemsArrayWithKey);

export const getPlayerCompletions = (game, id) =>
  database
    .ref(`games/${game}/history/playerCompletions/${id}`)
    .once('value')
    .then(getItemsArrayWithKey);

export const getPlayerWinsAndLosses = (game, id) =>
  database
    .ref(`games/${game}/history/victories`)
    .once('value')
    .then(getItemsArrayWithKey)
    .then((results) =>
      results.filter((result) => result.winner === id || result.loser === id),
    );
