import { ActionTypes } from 'constants/constants';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { auth } from 'lib/firebase';
import * as sessionActions from './sessionActions';

const authUser = 'fake-auth-user';
const game = 'fake-game';
const mockStore = configureMockStore([thunk]);

describe('Session Actions', () => {
  it('can dispatch setAuthUser', () => {
    expect(sessionActions.setAuthUser(authUser)).toEqual({
      type: ActionTypes.setAuthUser,
      authUser,
    });
  });

  it('can dispatch setGame', () => {
    expect(sessionActions.setGame(game)).toEqual({
      type: ActionTypes.setGame,
      game,
    });
  });

  it('can dispatch setPlayersLoaded', () => {
    expect(sessionActions.setPlayersLoaded(true)).toEqual({
      type: ActionTypes.setPlayersLoaded,
      playersLoaded: true,
    });
  });

  it('can dispatch setPointsLoaded', () => {
    expect(sessionActions.setPointsLoaded(true)).toEqual({
      type: ActionTypes.setPointsLoaded,
      pointsLoaded: true,
    });
  });

  it('can dispatch setChoresLoaded', () => {
    expect(sessionActions.setChoresLoaded(true)).toEqual({
      type: ActionTypes.setChoresLoaded,
      choresLoaded: true,
    });
  });

  it('can dispatch signOut', () => {
    const store = mockStore({
      session: {
        authUser,
        game,
        playersLoaded: true,
        pointsLoaded: true,
        choresLoaded: true,
      },
    });

    const expectedActions = [
      { type: ActionTypes.setGame, game: null },
      { type: ActionTypes.setChoresLoaded, choresLoaded: false },
      { type: ActionTypes.setPlayersLoaded, playersLoaded: false },
      { type: ActionTypes.setPointsLoaded, pointsLoaded: false },
    ];

    jest.spyOn(auth, 'signOut').mockReturnValue();
    expect(auth.signOut).toHaveBeenCalledTimes(0);

    store.dispatch(sessionActions.signOut());

    expect(store.getActions()).toEqual(expectedActions);
    expect(auth.signOut).toHaveBeenCalledTimes(1);
  });


  it('can dispatch createGame', () => {
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

  it('can dispatch joinGame', () => {
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
});
