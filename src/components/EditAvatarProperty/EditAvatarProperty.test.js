import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DefaultAvatar } from 'constants/avatars';
import EditAvatarProperty from './EditAvatarProperty';

const mockStore = configureMockStore([thunk]);

describe('EditAvatarProperty', () => {
  const store = mockStore({
    session: {
      authUser: {
        uid: 'test-user',
      },
      game: {
        gameId: 'test-game',
      },
    },
    players: {
      'test-user': {
        name: 'Player 1',
        avatar: DefaultAvatar,
      },
    },
  });

  it('Renders', () => {
    expect(shallow(<EditAvatarProperty
      store={store}
      match={{ params: { propertyToEdit: 'topType' } }}
    />).dive()).toMatchSnapshot();
  });
});
