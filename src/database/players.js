import firebase, { auth, database } from 'database';

export const savePlayerName = (game, playerId, playerName) =>
  database.ref(`games/${game}/players/${playerId}/name`).set(playerName);

export const updatePlayerLogin = (existingPassword, newEmail, newPassword) => {
  const user = auth.currentUser;
  // eslint-disable-next-line import/no-named-as-default-member
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email,
    existingPassword,
  );

  user
    .reauthenticateWithCredential(credential)
    .then(() => (newEmail ? user.updateEmail(newEmail) : Promise.resolve()))
    .then(() =>
      newPassword ? user.updatePassword(newPassword) : Promise.resolve(),
    );
};

export const addPointsToPlayer = (playerId, points, game) =>
  database
    .ref(`games/${game}/players/${playerId}/points`)
    .once('value', result => {
      const pts = result.val();
      database
        .ref(`games/${game}/players/${playerId}/points`)
        .set(pts + points);
    });
