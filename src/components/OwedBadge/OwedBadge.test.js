import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { shallow } from 'enzyme';
import { DefaultAvatar } from 'constants/avatars';
import OwedBadge from './OwedBadge';

const mockStore = configureMockStore([thunk]);
const session = {
  game: {
    gameId: 'test-game',
  },
};

describe('OwedBadge', () => {
  describe('With player not being owed', () => {
    it('Renders nothing for p1', () => {
      const player = {
        id: 'player1',
        avatar: DefaultAvatar,
        name: 'Player 1',
      };
      const store = mockStore({
        points: {
          present: {
            player1: {
              isOwed: 0,
            },
          },
        },
        session,
      });
      const badgeComponent = shallow(<OwedBadge store={store} player={player} idx={0} />).dive();
      expect(badgeComponent).toMatchSnapshot();
    });

    it('Renders nothing for p2', () => {
      const player = {
        id: 'player2',
        avatar: DefaultAvatar,
        name: 'Player 2',
      };
      const store = mockStore({
        points: {
          present: {
            player2: {
              isOwed: 0,
            },
          },
        },
        session,
      });
      const badgeComponent = shallow(<OwedBadge store={store} player={player} idx={1} />).dive();
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
      const store = mockStore({
        points: {
          present: {
            player1: {
              isOwed: 1,
            },
          },
        },
        session,
      });
      const badgeComponent = shallow(<OwedBadge store={store} player={player} idx={0} />).dive();
      expect(badgeComponent).toMatchSnapshot();
    });

    it('Renders badges with p2 being owed 1', () => {
      const player = {
        id: 'player2',
        avatar: DefaultAvatar,
        name: 'Player 2',
      };
      const store = mockStore({
        points: {
          present: {
            player2: {
              isOwed: 1,
            },
          },
        },
        session,
      });
      const badgeComponent = shallow(<OwedBadge store={store} player={player} idx={1} />).dive();
      expect(badgeComponent).toMatchSnapshot();
    });

    it('Renders badges with p1 being owed > 1', () => {
      const player = {
        id: 'player1',
        avatar: DefaultAvatar,
        name: 'Player 1',
      };
      const store = mockStore({
        points: {
          present: {
            player1: {
              isOwed: 2,
            },
          },
        },
        session,
      });
      const badgeComponent = shallow(<OwedBadge store={store} player={player} idx={0} />).dive();
      expect(badgeComponent).toMatchSnapshot();
    });

    it('Renders badges with p2 being owed > 1', () => {
      const player = {
        id: 'player2',
        avatar: DefaultAvatar,
        name: 'Player 2',
      };
      const store = mockStore({
        points: {
          present: {
            player2: {
              isOwed: 2,
            },
          },
        },
        session,
      });
      const badgeComponent = shallow(<OwedBadge store={store} player={player} idx={1} />).dive();
      expect(badgeComponent).toMatchSnapshot();
    });

    it('Handles clicks', () => {
      const player = {
        id: 'player1',
        avatar: DefaultAvatar,
        name: 'Player 1',
      };
      const store = mockStore({
        points: {
          present: {
            player1: {
              isOwed: 1,
            },
          },
        },
        session,
      });
      const badgeComponent = shallow(<OwedBadge store={store} player={player} idx={0} />).dive();
      const paidDebtFn = jest.fn();
      badgeComponent.setProps({
        debtPaid: paidDebtFn,
      });
      // Click the option in the popup menu
      badgeComponent.prop('options')[0].onClick();
      expect(paidDebtFn).toHaveBeenCalledTimes(1);
    });
  });
});
