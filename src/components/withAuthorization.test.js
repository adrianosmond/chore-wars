import React from 'react';
import { Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import { auth, database } from 'lib/firebase';
import Loading from 'components/Loading';
import { ActionTypes } from 'constants/constants';
import * as routes from 'constants/routes';
import { DefaultAvatar } from 'constants/avatars';
import withAuthorization from './withAuthorization';

const DummyComponent = () => <div>Fake Component</div>;
const authCondition = authUser => !!authUser;
const mockStore = configureMockStore([thunk]);
const loadingComponent = mount(<Loading />).html();
const pushFn = jest.fn();
const authUser = {
  uid: 'fake-user',
  provider: 'custom',
  token: 'authToken',
  expires: Math.floor(new Date() / 1000) + (24 * 60 * 60),
};
const gameId = 'fake-game';
const isLoading = state => !state.pointsLoaded || !state.choresLoaded || !state.playersLoaded;
const AuthComponent = withAuthorization(authCondition, isLoading)(DummyComponent);

describe('withAuthorization', () => {
  describe('Before authorisation', () => {
    const store = mockStore({
      session: {
        authUser: null,
        game: null,
        playersLoaded: false,
        pointsLoaded: false,
        choresLoaded: false,
      },
    });
    
    const history = {
      push: pushFn,
      location: {
        pathName: routes.CHORES,
      },
      listen: jest.fn(),
    };

    const component = mount((
      <Provider store={store}>
        <Router history={history}>
          <AuthComponent />
        </Router>
      </Provider>
    ));

    afterEach(() => {
      auth.signOut();
      pushFn.mockClear();
      store.clearActions();
    });

    it('Should not render the Login component before auth happens', () => {
      expect(component.html()).toBe(loadingComponent);
    });

    it('Should dispatch setAuthUser when authUser changes', () => {
      auth.changeAuthState(authUser);
      expect(store.getActions()).toEqual([{
        type: ActionTypes.setAuthUser,
        authUser,
      }]);
    });

    it('Should redirect to the login page if auth fails', () => {
      expect(pushFn).not.toHaveBeenCalled();
      auth.changeAuthState(false);
      expect(pushFn).toHaveBeenCalledWith(routes.LOGIN);
    });

    it('Should check to see if an authorised user has a game', () => {
      jest.spyOn(database, 'ref');
      auth.changeAuthState(authUser);
      expect(database.ref).toHaveBeenCalledWith(`users/${authUser.uid}`);
    });

    it('Should redirect to the NO_GAME route if an authorised user has no game', () => {
      expect(pushFn).not.toHaveBeenCalled();
      auth.changeAuthState(authUser);
      expect(pushFn).toHaveBeenCalledWith(routes.NO_GAME);
    });

    it('Should load the game data if an authorised user has a game', () => {
      const chores = {
        first: {
          frequency: 7,
          lastDone: 0,
          pointsPerTime: 50,
          title: 'First',
        },
        second: {
          frequency: 0,
          lastDone: 10,
          pointsPerTime: 10,
          title: 'Second',
        },
      };
      const players = {
        [authUser.uid]: {
          name: 'Player 1',
          avatar: DefaultAvatar,
        },
        player2: {
          name: 'Player 2',
          avatar: DefaultAvatar,
        },
      };
      const points = {
        [authUser.uid]: {
          points: 100,
          isOwed: 0,
        },
        test2: {
          points: 100,
          isOwed: 1,
        },
      };
      database.ref().set({
        games: {
          [gameId]: {
            players,
            points,
            chores,
          },
          test2: {},
        },
        users: {
          [authUser.uid]: {
            gameId,
          },
        },
      });
      auth.changeAuthState(authUser);
      expect(store.getActions()).toEqual([
        { type: ActionTypes.setAuthUser, authUser },
        { type: ActionTypes.setGame, game: { gameId } },
        { type: ActionTypes.setPlayers, players },
        { type: ActionTypes.setPlayersLoaded, playersLoaded: true },
        { type: ActionTypes.setPoints, points },
        { type: ActionTypes.setPointsLoaded, pointsLoaded: true },
        { type: ActionTypes.setChores, chores },
        { type: ActionTypes.setChoresLoaded, choresLoaded: true },
      ]);
      expect(component.html()).toBe(loadingComponent);
    });
  });

  describe('After Authorisation', () => {
    let state = {
      session: {
        authUser,
        game: null,
        playersLoaded: true,
        pointsLoaded: true,
        choresLoaded: true,
      },
    };
    const store = mockStore(() => state);

    const history = {
      push: pushFn,
      location: {
        pathName: routes.NO_GAME,
      },
      listen: jest.fn(),
    };

    const component = mount((
      <Provider store={store}>
        <Router history={history}>
          <AuthComponent />
        </Router>
      </Provider>
    ));

    it('Should render the correct component after auth and loading succeed', () => {
      expect(component.html()).toBe(mount(<DummyComponent />).html());
    });
  });
});
