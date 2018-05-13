import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { makePlayersArray } from 'constants/utils';
import { DefaultAvatar } from 'constants/avatars';
import Players from './Players';
import { join } from 'path';

const mockStore = configureMockStore([thunk]);
const session = {
  authUser: 'player1',
  game: {
    gameId: 'test-game',
  },
};

describe('Players', () => {
  it('Renders players', () => {
    const playerPoints = {
      player1: {
        avatar: DefaultAvatar,
        name: 'Player 1',
        isOwed: 0,
      },
      player2: {
        avatar: DefaultAvatar,
        name: 'Player 2',
        isOwed: 0,
      },
    };
    const players = makePlayersArray(playerPoints);
    const store = mockStore({
      points: {
        present: playerPoints,
      },
      session,
    });
    const playersComponent = shallow(<Players store={store} players={players} />).dive();
    expect(playersComponent).toMatchSnapshot();
  });

  describe('With players being owed', () => {
    it('Renders players with p1 being owed', () => {
      const playerPoints = {
        player1: {
          avatar: DefaultAvatar,
          name: 'Player 1',
          isOwed: 1,
        },
        player2: {
          avatar: DefaultAvatar,
          name: 'Player 2',
          isOwed: 0,
        },
      };
      const players = makePlayersArray(playerPoints);
      const store = mockStore({
        points: {
          present: playerPoints,
        },
        session,
      });
      const playersComponent = shallow(<Players store={store} players={players} />).dive();
      expect(playersComponent).toMatchSnapshot();
    });
  
    it('Renders players with p2 being owed', () => {
      const playerPoints = {
        player1: {
          avatar: DefaultAvatar,
          name: 'Player 1',
          isOwed: 0,
        },
        player2: {
          avatar: DefaultAvatar,
          name: 'Player 2',
          isOwed: 1,
        },
      };
      const players = makePlayersArray(playerPoints);
      const store = mockStore({
        points: {
          present: playerPoints,
        },
        session,
      });
      const playersComponent = shallow(<Players store={store} players={players} />).dive();
      expect(playersComponent).toMatchSnapshot();
    });
  
    it('Renders players with p1 being owed > 1', () => {
      const playerPoints = {
        player1: {
          avatar: DefaultAvatar,
          name: 'Player 1',
          isOwed: 2,
        },
        player2: {
          avatar: DefaultAvatar,
          name: 'Player 2',
          isOwed: 0,
        },
      };
      const players = makePlayersArray(playerPoints);
      const store = mockStore({
        points: {
          present: playerPoints,
        },
        session,
      });
      const playersComponent = shallow(<Players store={store} players={players} />).dive();
      expect(playersComponent).toMatchSnapshot();
    });
  
    it('Renders players with p2 being owed > 1', () => {
      const playerPoints = {
        player1: {
          avatar: DefaultAvatar,
          name: 'Player 1',
          isOwed: 0,
        },
        player2: {
          avatar: DefaultAvatar,
          name: 'Player 2',
          isOwed: 2,
        },
      };
      const players = makePlayersArray(playerPoints);
      const store = mockStore({
        points: {
          present: playerPoints,
        },
        session,
      });
      const playersComponent = shallow(<Players store={store} players={players} />).dive();
      expect(playersComponent).toMatchSnapshot();
    });
  });

  describe('With one player', () => {
    it('Renders and displays the join code', () => {
      const joinCode = 'abcdefgh';
      const playerPoints = {
        player1: {
          avatar: DefaultAvatar,
          name: 'Player 1',
          isOwed: 0,
          joinCode,
        },
      };
      const players = makePlayersArray(playerPoints);
      const store = mockStore({
        points: {
          present: playerPoints,
        },
        session,
      });
      const playersComponent = shallow(<Players store={store} players={players} />).dive();
      expect(playersComponent).toMatchSnapshot();
      expect(playersComponent.find('#join-code').text()).toBe(joinCode);
    });
  });
});
