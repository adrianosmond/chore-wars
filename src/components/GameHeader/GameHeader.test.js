import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DefaultAvatar } from 'constants/avatars';
import GameHeader from './GameHeader';

const mockStore = configureMockStore([thunk]);

describe('GameHeader', () => {
  const store = mockStore({
    players: {
      'test-user': {
        name: 'Player 1',
        avatar: DefaultAvatar,
      },
      'test-user-2': {
        name: 'Player 2',
        avatar: DefaultAvatar,
      },
    },
  });

  it('Renders', () => {
    expect(shallow(<GameHeader store={store} />).dive()).toMatchSnapshot();
  });
});
