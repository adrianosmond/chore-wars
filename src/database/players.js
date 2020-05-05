import { auth, database, emailCredential } from 'database';
import { MAX_POINT_DIFFERENCE } from 'constants/constants';

const makeVictoryHistoryObj = (
  loserId,
  winnerId,
  date = new Date().getTime(),
) => ({
  winner: winnerId,
  loser: loserId,
  dateWon: date,
  datePaidBack: 0,
});

const getPlayerPoints = (game, playerId) =>
  database
    .ref(`games/${game}/players/${playerId}/points`)
    .once('value')
    .then((result) => result.val());

const setPlayerPoints = (game, playerId, points) =>
  database.ref(`games/${game}/players/${playerId}/points`).set(points);

const addToVictories = (game, historyObj) =>
  database.ref(`games/${game}/history/victories`).push(historyObj);

const setPaidBackDate = (game, victoryId, date = new Date().getTime()) =>
  database
    .ref(`games/${game}/history/victories/${victoryId}/datePaidBack`)
    .set(date);

export const savePlayerName = (game, playerId, playerName) =>
  database.ref(`games/${game}/players/${playerId}/name`).set(playerName);

export const updatePlayerLogin = (existingPassword, newEmail, newPassword) => {
  const user = auth.currentUser;
  const credential = emailCredential(user.email, existingPassword);

  return user
    .reauthenticateWithCredential(credential)
    .then(() => (newEmail ? user.updateEmail(newEmail) : Promise.resolve()))
    .then(() =>
      newPassword ? user.updatePassword(newPassword) : Promise.resolve(),
    );
};

export const addPointsToPlayer = (game, playerId, points) =>
  getPlayerPoints(game, playerId).then((currentPoints) =>
    setPlayerPoints(game, playerId, points + currentPoints),
  );

export const claimVictory = (game, loserId, winnerId) =>
  Promise.all([
    addPointsToPlayer(game, loserId, MAX_POINT_DIFFERENCE),
    addToVictories(game, makeVictoryHistoryObj(loserId, winnerId)),
  ]);

export const victoryPaidBack = (game, victoryId) =>
  setPaidBackDate(game, victoryId);
