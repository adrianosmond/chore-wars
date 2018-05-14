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

    database.ref('games').push().then((ref) => {
      const gameKey = ref.key;
      const userData = {
        gameId: gameKey,
      };
      database.ref(`joinCodes/${joinCode}`).set(gameKey);
      database.ref(`users/${userId}`).set(userData).then(() => {
        dispatch(setGame(userData));
        ref.set(gameData);
      });
    });
  };
}

export function joinGame(userId, gameToJoin, playerName) {
  return (dispatch) => {
    database.ref(`joinCodes/${gameToJoin}`).once('value', (result) => {
      const gameKey = result.val();
      const userData = {
        gameId: gameKey,
      };
      database.ref(`users/${userId}`).set(userData).then(() => {
        database.ref(`games/${gameKey}/players/`).once('value', (users) => {
          users.forEach(user => user.child('joinCode').ref.set(null));
        });
        Promise.all([
          database.ref(`games/${gameKey}/points/${userId}`),
          database.ref(`games/${gameKey}/players/${userId}`),
        ]).then((refs) => {
          refs[0].set(DEFAULT_POINTS_DATA);
          refs[1].set(generatePlayerData(playerName));
          database.ref(`games/${gameKey}/gameIncomplete`).set(null);
          database.ref(`joinCodes/${gameToJoin}`).set(null);
          dispatch(setGame(userData));
        });
      });
    });
  };
}
