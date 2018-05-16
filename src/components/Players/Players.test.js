import React from 'react';
import { shallow } from 'enzyme';
import { makePlayersArray } from 'constants/utils';
import { DefaultAvatar } from 'constants/avatars';
import Players from './Players';

describe('Players', () => {
  it('Renders players', () => {
    const playerPoints = {
      player1: {
        avatar: DefaultAvatar,
        name: 'Player 1',
      },
      player2: {
        avatar: DefaultAvatar,
        name: 'Player 2',
      },
    };
    const players = makePlayersArray(playerPoints);
    const playersComponent = shallow(<Players players={players} />);
    expect(playersComponent).toMatchSnapshot();
  });

  describe('With players being owed', () => {
    it('Renders players with p1 being owed', () => {
      const playerPoints = {
        player1: {
          avatar: DefaultAvatar,
          name: 'Player 1',
        },
        player2: {
          avatar: DefaultAvatar,
          name: 'Player 2',
        },
      };
      const players = makePlayersArray(playerPoints);
      const playersComponent = shallow(<Players players={players} />);
      expect(playersComponent).toMatchSnapshot();
    });

    it('Renders players with p2 being owed', () => {
      const playerPoints = {
        player1: {
          avatar: DefaultAvatar,
          name: 'Player 1',
        },
        player2: {
          avatar: DefaultAvatar,
          name: 'Player 2',
        },
      };
      const players = makePlayersArray(playerPoints);
      const playersComponent = shallow(<Players players={players} />);
      expect(playersComponent).toMatchSnapshot();
    });

    it('Renders players with p1 being owed > 1', () => {
      const playerPoints = {
        player1: {
          avatar: DefaultAvatar,
          name: 'Player 1',
        },
        player2: {
          avatar: DefaultAvatar,
          name: 'Player 2',
        },
      };
      const players = makePlayersArray(playerPoints);
      const playersComponent = shallow(<Players players={players} />);
      expect(playersComponent).toMatchSnapshot();
    });

    it('Renders players with p2 being owed > 1', () => {
      const playerPoints = {
        player1: {
          avatar: DefaultAvatar,
          name: 'Player 1',
        },
        player2: {
          avatar: DefaultAvatar,
          name: 'Player 2',
        },
      };
      const players = makePlayersArray(playerPoints);
      const playersComponent = shallow(<Players players={players} />);
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
          joinCode,
        },
      };
      const players = makePlayersArray(playerPoints);
      const playersComponent = shallow(<Players players={players} />);
      expect(playersComponent).toMatchSnapshot();
      expect(playersComponent.find('#join-code').text()).toBe(joinCode);
    });
  });
});
