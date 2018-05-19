import { ActionTypes } from 'constants/constants';
import * as sessionActions from './sessionActions';

const authUser = 'fake-auth-user';
const game = 'fake-game';

test('setAuthUser', () => {
  expect(sessionActions.setAuthUser(authUser)).toEqual({
    type: ActionTypes.setAuthUser,
    authUser,
  });
});

test('setGame', () => {
  expect(sessionActions.setGame(game)).toEqual({
    type: ActionTypes.setGame,
    game,
  });
});

test('setPlayersLoaded', () => {
  expect(sessionActions.setPlayersLoaded(true)).toEqual({
    type: ActionTypes.setPlayersLoaded,
    playersLoaded: true,
  });
});

test('setPointsLoaded', () => {
  expect(sessionActions.setPointsLoaded(true)).toEqual({
    type: ActionTypes.setPointsLoaded,
    pointsLoaded: true,
  });
});

test('setChoresLoaded', () => {
  expect(sessionActions.setChoresLoaded(true)).toEqual({
    type: ActionTypes.setChoresLoaded,
    choresLoaded: true,
  });
});

test('signOut', () => {
  // expect(sessionActions.signOut()).toEqual({
  // return (dispatch) => {
  //   dispatch(setGame(null));
  //   dispatch(setChoresLoaded(false));
  //   dispatch(setPlayersLoaded(false));
  //   dispatch(setPointsLoaded(false));
  //   auth.signOut();
  // };
  // });
});


test('createGame', () => {
  // expect(sessionActions.createGame(userId)).toEqual({
  // return (dispatch) => {
  //   const joinCode = createJoinCode();
  //   const gameData = {
  //     gameIncomplete: true,
  //     players: {
  //       [userId]: generatePlayerData(playerName, joinCode),
  //     },
  //     points: {
  //       [userId]: DEFAULT_POINTS_DATA,
  //     },
  //   };

  //   database.ref('games').push().then((ref) => {
  //     const gameKey = ref.key;
  //     const userData = {
  //       gameId: gameKey,
  //     };
  //     database.ref(`joinCodes/${joinCode}`).set(gameKey);
  //     database.ref(`users/${userId}`).set(userData).then(() => {
  //       dispatch(setGame(userData));
  //       ref.set(gameData);
  //     });
  //   });
  // };
  // });
});

test('joinGame', () => {
  // expect(sessionActions.joinGame(userId)).toEqual({
  // return (dispatch) => {
  //   database.ref(`joinCodes/${gameToJoin}`).once('value', (result) => {
  //     const gameKey = result.val();
  //     const userData = {
  //       gameId: gameKey,
  //     };
  //     database.ref(`users/${userId}`).set(userData).then(() => {
  //       database.ref(`games/${gameKey}/players/`).once('value', (users) => {
  //         users.forEach(user => user.child('joinCode').ref.set(null));
  //       });
  //       Promise.all([
  //         database.ref(`games/${gameKey}/points/${userId}`),
  //         database.ref(`games/${gameKey}/players/${userId}`),
  //       ]).then((refs) => {
  //         refs[0].set(DEFAULT_POINTS_DATA);
  //         refs[1].set(generatePlayerData(playerName));
  //         database.ref(`games/${gameKey}/gameIncomplete`).set(null);
  //         database.ref(`joinCodes/${gameToJoin}`).set(null);
  //         dispatch(setGame(userData));
  //       });
  //     });
  //   });
  // };
  // });
});
