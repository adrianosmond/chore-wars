import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DefaultAvatar } from 'constants/avatars';
import { auth } from 'lib/firebase';
import Profile, { EditAvatarLinks } from './Profile';

const mockStore = configureMockStore([thunk]);

describe('Profile', () => {
  const store = mockStore({
    session: {
      game: {
        gameId: 'fake-game',
      },
      authUser: {
        uid: 'player1',
      },
    },
    players: {
      player1: {
        name: 'Player 1',
        avatar: DefaultAvatar,
      },
    },
  });
  const component = shallow(<Profile store={store} />).dive()
  it('Renders', () => {
    expect(component).toMatchSnapshot();
  });

  it('Can sign out', () => {
    jest.spyOn(auth, 'signOut');
    const signOutButton = component.find('#profile-sign-out');
    expect(auth.signOut).not.toHaveBeenCalled();
    signOutButton.simulate('click');
    expect(auth.signOut).toHaveBeenCalledTimes(1);
  });

  describe('EditAvatarLinks', () => {
    it('Renders', () => {
      expect(shallow(<EditAvatarLinks avatar={DefaultAvatar} />)).toMatchSnapshot();
    });
  });
});
