import { createJoinCode } from 'utils/game';
import {
  generatePlayerData,
  makePlayersArray,
  getMaxPoints,
} from 'utils/players';
import { addToTimePaused } from './chores';
import { database } from './index';

export const createGame = (userId, playerName) => {
  const joinCode = createJoinCode();
  const gameData = {
    gameIncomplete: true,
    players: {
      [userId]: generatePlayerData(playerName),
    },
  };

  return database
    .ref('games')
    .push()
    .then(ref => {
      const gameKey = ref.key;
      const userData = {
        gameId: gameKey,
      };
      database.ref(`joinCodes/${joinCode}`).set(gameKey);
      return database
        .ref(`users/${userId}`)
        .set(userData)
        .then(() => {
          return ref.set(gameData);
        });
    });
};

export const joinGame = (userId, joinCode, playerName) => {
  let userData = null;
  const getGameFromJoinCode = () =>
    new Promise(resolve => {
      database.ref(`joinCodes/${joinCode}`).once('value', result => {
        resolve(result.val());
      });
    });

  const setUserData = gameKey =>
    new Promise(resolve => {
      userData = { gameId: gameKey };
      database
        .ref(`users/${userId}`)
        .set(userData)
        .then(() => {
          resolve(gameKey);
        });
    });

  const addUserToGame = gameKey =>
    database.ref(`games/${gameKey}/players`).once('value', result => {
      // Someone joining the game shouldn't be at a disadvantage, so give
      // them the same number of points as the current leader
      const maxPoints = getMaxPoints(makePlayersArray(result.val()));
      return database
        .ref(`games/${gameKey}/players/${userId}`)
        .set(generatePlayerData(playerName, maxPoints));
    });

  return getGameFromJoinCode()
    .then(setUserData)
    .then(addUserToGame);
};

export const startHoliday = (gameId, holidayStartTime = new Date().getTime()) =>
  database.ref(`games/${gameId}/holiday`).set(holidayStartTime);

export const stopHoliday = (
  gameId,
  holidayStartTime,
  holidayEndTime = new Date().getTime(),
) => {
  const holidayTime = holidayEndTime - holidayStartTime;
  return Promise.all([
    database.ref(`games/${gameId}/holiday`).set(null),
    database.ref(`games/${gameId}/chores`).once('value', result =>
      result.forEach(choreRef => {
        const chore = choreRef.val();
        if ('timePaused' in chore) {
          addToTimePaused(gameId, choreRef.key, chore.timePaused, holidayTime);
        }
      }),
    ),
  ]);
};

export const lockGame = (gameId, joinCode) =>
  Promise.all([
    database.ref(`games/${gameId}/gameIncomplete`).set(null),
    database.ref(`joinCodes/${joinCode}`).set(null),
  ]);
