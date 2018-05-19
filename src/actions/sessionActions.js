import { ActionTypes, DEFAULT_POINTS_DATA } from 'constants/constants';
import { generatePlayerData, createJoinCode } from 'constants/utils';
import { auth, database } from 'lib/firebase';

export function setAuthUser(authUser) {
  return {
    type: ActionTypes.setAuthUser,
    authUser,
  };
}

export function setGame(game) {
  return {
    type: ActionTypes.setGame,
    game,
  };
}

export function setPlayersLoaded(playersLoaded) {
  return {
    type: ActionTypes.setPlayersLoaded,
    playersLoaded,
  };
}

export function setPointsLoaded(pointsLoaded) {
  return {
    type: ActionTypes.setPointsLoaded,
    pointsLoaded,
  };
}

export function setChoresLoaded(choresLoaded) {
  return {
    type: ActionTypes.setChoresLoaded,
    choresLoaded,
  };
}

export function signOut() {
  return (dispatch) => {
    dispatch(setGame(null));
    dispatch(setChoresLoaded(false));
    dispatch(setPlayersLoaded(false));
    dispatch(setPointsLoaded(false));
    auth.signOut();
  };
}

export function createGame(userId, playerName) {
  return (dispatch) => {
    const joinCode = createJoinCode();
    const gameData = {
      gameIncomplete: true,
      players: {
        [userId]: generatePlayerData(playerName, joinCode),
      },
      points: {
        [userId]: DEFAULT_POINTS_DATA,
      },
    };

    return database.ref('games').push().then((ref) => {
      const gameKey = ref.key;
      const userData = {
        gameId: gameKey,
      };
      database.ref(`joinCodes/${joinCode}`).set(gameKey);
      return database.ref(`users/${userId}`).set(userData).then(() => {
        dispatch(setGame(userData));
        return ref.set(gameData);
      });
    });
  };
}

export function joinGame(userId, joinCode, playerName) {
  let userData = null;
  const getGameFromJoinCode = () => new Promise((resolve) => {
    database.ref(`joinCodes/${joinCode}`).once('value', (result) => {
      resolve(result.val());
    });
  });

  const setUserData = gameKey => new Promise((resolve) => {
    userData = { gameId: gameKey };
    database.ref(`users/${userId}`).set(userData).then(() => {
      resolve(gameKey);
    });
  });

  const addUserAndCleanUp = gameKey => Promise.all([
    database.ref(`games/${gameKey}/points/${userId}`).set(DEFAULT_POINTS_DATA),
    database.ref(`games/${gameKey}/players/${userId}`).set(generatePlayerData(playerName)),
    database.ref(`games/${gameKey}/gameIncomplete`).set(null),
    database.ref(`joinCodes/${joinCode}`).set(null),
  ]);

  return dispatch => getGameFromJoinCode()
    .then(setUserData)
    .then(addUserAndCleanUp)
    .then(() => dispatch(setGame(userData)));
}
