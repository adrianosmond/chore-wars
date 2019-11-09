import { database } from 'database';
import { HISTORY_TYPES } from 'constants/constants';
import { addPointsToPlayer } from './players';

const makeHistoryObj = (type, date, playerId, choreId, extras) => ({
  type,
  date,
  playerId,
  choreId,
  ...extras,
});

const addToAllHistory = (game, historyObj) =>
  database.ref(`games/${game}/history/all`).push(historyObj);

const deleteFromAllHistory = (game, choreId) =>
  database
    .ref(`games/${game}/history/all`)
    .orderByChild('choreId')
    .equalTo(choreId)
    .once('value', result =>
      result.forEach(record => {
        record.ref.remove();
      }),
    );

const addToChoreHistory = (game, choreId, historyObj) =>
  database.ref(`games/${game}/history/${choreId}`).push(historyObj);

const deleteFromChoreHistory = (game, choreId) =>
  database.ref(`games/${game}/history/${choreId}`).set(null);

const incrementPlayerCompletions = (game, choreId, playerId) =>
  database
    .ref(`games/${game}/history/completions/${choreId}/${playerId}`)
    .once('value')
    .then(result => {
      const completions = result.val() || 0;
      database
        .ref(`games/${game}/history/completions/${choreId}/${playerId}`)
        .set(completions + 1);
    });

const deleteFromChoreCompletionHistory = (game, choreId) =>
  database.ref(`games/${game}/history/completions/${choreId}`).set(null);

const addToTimeDifferenceHistory = (game, choreId, difference) =>
  database
    .ref(`games/${game}/history/timeDifferences/${choreId}`)
    .push(difference);

const deleteFromTimeDifferenceHistory = (game, choreId) =>
  database.ref(`games/${game}/history/timeDifferences/${choreId}`).set(null);

const addToPlayerCompletionHistory = (game, playerId, historyObj) =>
  database
    .ref(`games/${game}/history/playerCompletions/${playerId}`)
    .push(historyObj);

const deleteFromPlayerCompletionHistory = (game, choreId) =>
  database
    .ref(`games/${game}/history/playerCompletions`)
    .once('value')
    .then(result => {
      const allPlayerCompletionHistory = result.val();
      if (!allPlayerCompletionHistory) {
        return Promise.resolve();
      }
      const newPlayerCompletionHistory = Object.entries(
        allPlayerCompletionHistory,
      ).reduce(
        (prevPlayer, [playerId, completions]) => ({
          ...prevPlayer,
          [playerId]: Object.entries(completions).reduce(
            (prevCompletion, [completionId, completion]) => {
              if (completion.choreId === choreId) {
                return prevCompletion;
              }
              return {
                ...prevCompletion,
                [completionId]: completion,
              };
            },
            {},
          ),
        }),
        {},
      );

      return database
        .ref(`games/${game}/history/playerCompletions`)
        .set(newPlayerCompletionHistory);
    });

const addChoreToDatabase = (game, chore) =>
  database.ref(`games/${game}/chores/`).push(chore);

const deleteChoreFromDatabase = (game, choreId) =>
  database.ref(`games/${game}/chores/${choreId}`).set(null);

const updateChoreProperty = (game, choreId, property, value) =>
  database.ref(`games/${game}/chores/${choreId}/${property}`).set(value);

const updateLastDone = (game, choreId, date) =>
  updateChoreProperty(game, choreId, 'lastDone', date);

const updateWaiting = (game, choreId, isWaiting) =>
  updateChoreProperty(game, choreId, 'isWaiting', isWaiting);

const updateTimePaused = (game, choreId, timePaused) =>
  updateChoreProperty(game, choreId, 'timePaused', timePaused);

const enableNextChoreInChain = (game, chore) =>
  chore.enables
    ? Promise.all([
        updateWaiting(game, chore.id, true),
        updateWaiting(game, chore.enables, false),
      ])
    : Promise.resolve();

const editChoreInDatabase = (game, chore, newChore) =>
  database.ref(`games/${game}/chores/${chore.id}`).set({
    ...newChore,
    ...(chore.enables && {
      enables: chore.enables,
      isWaiting: chore.isWaiting,
    }),
  });

const getAllChores = game =>
  database.ref(`games/${game}/chores/`).once('value');

const getWholeChainFromMemberChore = (game, choreId) =>
  getAllChores(game).then(result => {
    const allChores = result.val();
    let currentChore = allChores[choreId];
    if (!currentChore.enables) {
      return Promise.resolve([]);
    }
    Object.keys(allChores).forEach(key => {
      allChores[key].id = key;
    });
    const chain = [];
    while (currentChore.enables !== choreId) {
      chain.push(currentChore);
      currentChore = allChores[currentChore.enables];
    }
    chain.push(currentChore);
    return Promise.resolve(chain);
  });

const partialChoreUpdate = (game, choreId, update) =>
  database.ref(`games/${game}/chores/${choreId}`).update(update);

export const removeChainFeatures = (game, chore) =>
  partialChoreUpdate(game, chore.id, {
    isWaiting: null,
    enables: null,
  });

const breakChain = (game, choreId) =>
  getWholeChainFromMemberChore(game, choreId).then(chain =>
    Promise.all(chain.map(chore => removeChainFeatures(game, chore))),
  );

export const createChore = (game, playerId, chore) =>
  addChoreToDatabase(game, chore).then(ref => {
    const historyObj = makeHistoryObj(
      HISTORY_TYPES.CHORE_CREATED,
      new Date().getTime(),
      playerId,
      ref.key,
      chore,
    );

    return Promise.all([
      addToAllHistory(game, historyObj),
      addToChoreHistory(game, ref.key, historyObj),
    ]);
  });

export const completeChore = (
  game,
  playerId,
  chore,
  points,
  date = new Date().getTime(),
) => {
  const historyObj = makeHistoryObj(
    HISTORY_TYPES.CHORE_COMPLETED,
    date,
    playerId,
    chore.id,
    { points, name: chore.name },
  );

  return Promise.all([
    updateLastDone(game, chore.id, date),
    addPointsToPlayer(playerId, points, game),
    enableNextChoreInChain(game, chore),
    addToAllHistory(game, historyObj),
    addToChoreHistory(game, chore.id, historyObj),
    incrementPlayerCompletions(game, chore.id, playerId),
    addToTimeDifferenceHistory(game, chore.id, date - chore.lastDone),
    addToPlayerCompletionHistory(game, playerId, historyObj),
  ]);
};

export const updateChore = (game, playerId, chore, newChore) => {
  const historyObj = makeHistoryObj(
    HISTORY_TYPES.CHORE_EDITED,
    new Date().getTime(),
    playerId,
    chore.id,
    { previous: chore, ...newChore },
  );
  return Promise.all([
    editChoreInDatabase(game, chore, newChore),
    addToAllHistory(game, historyObj),
    addToChoreHistory(game, chore.id, historyObj),
  ]);
};

export const makeChain = (game, chores) =>
  chores.length < 2
    ? Promise.resolve()
    : Promise.all(
        chores.map((chore, idx) =>
          partialChoreUpdate(game, chore.id, {
            isWaiting: idx !== 0,
            enables: chores[(idx + 1) % chores.length].id,
          }),
        ),
      );

export const deleteChore = (game, choreId) =>
  breakChain(game, choreId).then(() =>
    Promise.all([
      deleteChoreFromDatabase(game, choreId),
      deleteFromAllHistory(game, choreId),
      deleteFromChoreHistory(game, choreId),
      deleteFromChoreCompletionHistory(game, choreId),
      deleteFromTimeDifferenceHistory(game, choreId),
      deleteFromPlayerCompletionHistory(game, choreId),
    ]),
  );

export const addToTimePaused = (
  game,
  choreId,
  existingTimePaused,
  timePaused,
) => updateTimePaused(game, choreId, existingTimePaused + timePaused);
