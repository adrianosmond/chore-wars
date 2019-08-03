import { database } from 'database';

// eslint-disable-next-line import/prefer-default-export
export const addPointsToPlayer = (playerId, points, game) =>
  database
    .ref(`games/${game}/players/${playerId}/points`)
    .once('value', result => {
      const pts = result.val();
      database
        .ref(`games/${game}/players/${playerId}/points`)
        .set(pts + points);
    });
