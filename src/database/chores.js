import { database } from 'database';
import { HISTORY_TYPES } from 'constants/constants';
import { addPointsToPlayer } from './players';

export const createChore = (game, playerId, chore) =>
  database
    .ref(`games/${game}/chores/`)
    .push(chore)
    .then(ref => {
      const creation = {
        type: HISTORY_TYPES.CHORE_CREATED,
        choreId: ref.key,
        playerId,
        date: new Date().getTime(),
        ...chore,
      };
      return Promise.all([
        database.ref(`games/${game}/history/all`).push(creation),
        database.ref(`games/${game}/history/${ref.key}`).push(creation),
      ]);
    });

export const completeChore = (
  game,
  playerId,
  chore,
  points,
  date = new Date().getTime(),
) => {
  const historyObj = {
    type: HISTORY_TYPES.CHORE_COMPLETED,
    choreId: chore.id,
    playerId,
    points,
    date,
  };
  return Promise.all([
    database.ref(`games/${game}/chores/${chore.id}/lastDone`).set(date),
    addPointsToPlayer(playerId, points, game),
    chore.enables
      ? database.ref(`games/${game}/chores/${chore.id}/isWaiting`).set(true)
      : Promise.resolve(),
    chore.enables
      ? database
          .ref(`games/${game}/chores/${chore.enables}/isWaiting`)
          .set(false)
      : Promise.resolve(),
    database.ref(`games/${game}/history/all`).push(historyObj),
    database
      .ref(`games/${game}/history/completions/${chore.id}/${playerId}`)
      .once('value')
      .then(result => {
        const completions = result.val() || 0;
        database
          .ref(`games/${game}/history/completions/${chore.id}/${playerId}`)
          .set(completions + 1);
      }),
    database
      .ref(`games/${game}/history/timeDifferences/${chore.id}`)
      .push(date - chore.lastDone),
    database.ref(`games/${game}/history/${chore.id}`).push(historyObj),
  ]);
};

export const updateChore = (game, playerId, chore, newChore) => {
  const historyObj = {
    type: HISTORY_TYPES.CHORE_EDITED,
    date: new Date().getTime(),
    choreId: chore.id,
    previous: chore,
    playerId,
    ...newChore,
  };
  return Promise.all([
    database.ref(`games/${game}/chores/${chore.id}`).set(newChore),
    database.ref(`games/${game}/history/all`).push(historyObj),
    database.ref(`games/${game}/history/${chore.id}`).push(historyObj),
  ]);
};

export const makeChain = (game, chores) => {
  if (chores.length < 2) {
    return Promise.resolve();
  }
  return Promise.all(
    chores.map((chore, idx) =>
      database.ref(`games/${game}/chores/${chore.id}`).update({
        isWaiting: idx !== 0,
        enables: chores[(idx + 1) % chores.length].id,
      }),
    ),
  );
};

export const removeChainFeatures = (game, chore) => {
  database.ref(`games/${game}/chores/${chore.id}`).update({
    isWaiting: null,
    enables: null,
  });
};

export const breakChain = (game, choreId) =>
  database
    .ref(`games/${game}/chores/`)
    .once('value')
    .then(result => {
      const chain = [];
      const allChores = result.val();
      let currentChore = allChores[choreId];
      if (!currentChore.enables) {
        return Promise.resolve();
      }
      Object.keys(allChores).forEach(key => {
        allChores[key].id = key;
      });
      while (currentChore.enables !== choreId) {
        chain.push(currentChore);
        currentChore = allChores[currentChore.enables];
      }
      chain.push(currentChore);
      return Promise.all(chain.map(chore => removeChainFeatures(game, chore)));
    });

export const deleteChore = (game, choreId) =>
  breakChain(game, choreId).then(() =>
    Promise.all([
      database.ref(`games/${game}/chores/${choreId}`).set(null),
      database.ref(`games/${game}/history/${choreId}`).set(null),
      database.ref(`games/${game}/history/completions/${choreId}`).set(null),
      database
        .ref(`games/${game}/history/timeDifferences/${choreId}`)
        .set(null),
      database
        .ref(`games/${game}/history/all`)
        .orderByChild('choreId')
        .equalTo(choreId)
        .once('value', result =>
          result.forEach(record => {
            record.ref.remove();
          }),
        ),
    ]),
  );

export const addToTimePaused = (
  game,
  choreId,
  existingTimePaused,
  timePaused,
) => {
  database
    .ref(`games/${game}/chores/${choreId}/timePaused`)
    .set(existingTimePaused + timePaused);
};
