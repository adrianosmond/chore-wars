import { ActionTypes, DEFAULT_POINTS_DATA } from 'constants/constants';
import { auth, database, addToTimePaused } from 'utils/database';
import { generatePlayerData, createJoinCode } from 'constants/utils';
import { loadPlayers } from './playersReducer';
import { loadPoints } from './pointsReducer';
import { loadChores } from './choresReducer';

export const setAuthUser = authUser => ({
  type: ActionTypes.setAuthUser,
  authUser,
});

export const setGame = game => ({
  type: ActionTypes.setGame,
  game,
});

export const setPlayersLoaded = playersLoaded => ({
  type: ActionTypes.setPlayersLoaded,
  playersLoaded,
});

export const setPointsLoaded = pointsLoaded => ({
  type: ActionTypes.setPointsLoaded,
  pointsLoaded,
});

export const setChoresLoaded = choresLoaded => ({
  type: ActionTypes.setChoresLoaded,
  choresLoaded,
});

export const setHoliday = holiday => ({
  type: ActionTypes.setHoliday,
  holiday,
});

export const loadHoliday = gameId => dispatch => database.ref(`games/${gameId}/holiday`)
  .once('value', (ref) => {
    const holiday = ref.val() || false;
    dispatch(setHoliday(holiday));
  });

export const startHoliday = (gameId, holidayStartTime) => dispatch => database
  .ref(`games/${gameId}/holiday`)
  .set(holidayStartTime)
  .then(() => {
    dispatch(setHoliday(holidayStartTime));
  });

export const stopHoliday = (gameId, holidayStartTime, holidayEndTime) => (dispatch) => {
  const holidayTime = holidayEndTime - holidayStartTime;
  return Promise.all([
    database.ref(`games/${gameId}/holiday`).set(null)
      .then(() => {
        dispatch(setHoliday(false));
      }),
    database.ref(`games/${gameId}/chores`).once('value', result => result.forEach((choreRef) => {
      const chore = choreRef.val();
      if ('timePaused' in chore) {
        addToTimePaused(gameId, choreRef.key, chore.timePaused, holidayTime);
      }
    })),
  ]);
};

export function signOut() {
  return (dispatch) => {
    dispatch(setGame(null));
    dispatch(setHoliday(false));
    dispatch(setChoresLoaded(false));
    dispatch(setPlayersLoaded(false));
    dispatch(setPointsLoaded(false));
    auth.signOut();
  };
}

export const createGame = (userId, playerName) => (dispatch) => {
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

export const joinGame = (userId, joinCode, playerName) => (dispatch) => {
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

  return getGameFromJoinCode()
    .then(setUserData)
    .then(addUserAndCleanUp)
    .then(() => dispatch(setGame(userData)));
};

export const copyDummyData = () => (dispatch) => {
  if (process.env.NODE_ENV === 'development') {
    return database.ref(`users/${auth.currentUser.uid}`).once('value', (result) => {
      const game = result.val();
      const { gameId } = game;
      return database.ref(`games/${gameId}/`).once('value', (ref) => {
        database.ref('games/-TEST/').set(ref.val());
        dispatch(loadPlayers('-TEST'));
        dispatch(loadPoints('-TEST'));
        dispatch(loadChores('-TEST'));
        dispatch(loadHoliday('-TEST'));
      });
    });
  }
  return Promise.resolve();
};

export const INITIAL_STATE = {
  authUser: null,
  game: null,
  holiday: null,
  playersLoaded: false,
  pointsLoaded: false,
  choresLoaded: false,
};

export default function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.setAuthUser:
      return {
        ...state,
        authUser: action.authUser,
      };

    case ActionTypes.setGame:
      return {
        ...state,
        game: action.game,
      };

    case ActionTypes.setPlayersLoaded:
      return {
        ...state,
        playersLoaded: action.playersLoaded,
      };

    case ActionTypes.setPointsLoaded:
      return {
        ...state,
        pointsLoaded: action.pointsLoaded,
      };

    case ActionTypes.setChoresLoaded:
      return {
        ...state,
        choresLoaded: action.choresLoaded,
      };

    case ActionTypes.setHoliday:
      return {
        ...state,
        holiday: action.holiday,
      };

    default:
      return state;
  }
}
