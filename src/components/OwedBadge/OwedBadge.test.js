import React from 'react';
import { shallow } from 'enzyme';
import { DefaultAvatar } from 'constants/avatars';
import { paidDebt } from 'utils/database';
import OwedBadge from './OwedBadge';

describe('OwedBadge', () => {
  describe('With player not being owed', () => {
    it('Renders nothing for p1', () => {
      const player = {
        id: 'player1',
        avatar: DefaultAvatar,
        name: 'Player 1',
      };
      const badgeComponent = shallow(
        <OwedBadge
          points={{
            player1: {
              isOwed: 0,
            },
          }}
          player={player}
          gameId="test-game"
          idx={0}
        />,
      );
      expect(badgeComponent).toMatchSnapshot();
    });

    it('Renders nothing for p2', () => {
      const player = {
        id: 'player2',
        avatar: DefaultAvatar,
        name: 'Player 2',
      };
      const badgeComponent = shallow(
        <OwedBadge
          player={player}
          points={{
            player2: {
              isOwed: 0,
            },
          }}
          gameId="test-game"
          idx={1}
        />,
      );
      expect(badgeComponent).toMatchSnapshot();
    });
  });

  describe('With player being owed', () => {
    it('Renders badge with p1 being owed 1', () => {
      const player = {
        id: 'player1',
        avatar: DefaultAvatar,
        name: 'Player 1',
      };
      const badgeComponent = shallow(
        <OwedBadge
          player={player}
          points={{
            player1: {
              isOwed: 1,
            },
          }}
          gameId="test-game"
          idx={0}
        />,
      );
      expect(badgeComponent).toMatchSnapshot();
    });

    it('Renders badges with p2 being owed 1', () => {
      const player = {
        id: 'player2',
        avatar: DefaultAvatar,
        name: 'Player 2',
      };
      const badgeComponent = shallow(
        <OwedBadge
          player={player}
          points={{
            player2: {
              isOwed: 1,
            },
          }}
          gameId="test-game"
          idx={1}
        />,
      );
      expect(badgeComponent).toMatchSnapshot();
    });

    it('Renders badges with p1 being owed > 1', () => {
      const player = {
        id: 'player1',
        avatar: DefaultAvatar,
        name: 'Player 1',
      };
      const badgeComponent = shallow(
        <OwedBadge
          player={player}
          points={{
            player1: {
              isOwed: 2,
            },
          }}
          gameId="test-game"
          idx={0}
        />,
      );
      expect(badgeComponent).toMatchSnapshot();
    });

    it('Renders badges with p2 being owed > 1', () => {
      const player = {
        id: 'player2',
        avatar: DefaultAvatar,
        name: 'Player 2',
      };
      const badgeComponent = shallow(
        <OwedBadge
          player={player}
          points={{
            player2: {
              isOwed: 2,
            },
          }}
          gameId="test-game"
          idx={1}
        />,
      );
      expect(badgeComponent).toMatchSnapshot();
    });

    it('Handles clicks', () => {
      const player = {
        id: 'player1',
        avatar: DefaultAvatar,
        name: 'Player 1',
      };
      const badgeComponent = shallow(
        <OwedBadge
          player={player}
          points={{
            player1: {
              isOwed: 1,
            },
          }}
          gameId="test-game"
          idx={0}
        />,
      );
      // Click the option in the popup menu
      badgeComponent.prop('options')[0].onClick();
      expect(paidDebt).toHaveBeenCalledTimes(1);
    });
  });
});
