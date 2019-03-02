import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DefaultAvatar } from 'constants/avatars';
import { auth } from 'utils/database';
import * as playerActions from 'actions/playerActions';
import Profile, { EditAvatarLinks } from './Profile';

const mockStore = configureMockStore([thunk]);

describe('Profile', () => {
  const playerId = 'player1';
  const gameId = 'fake-game';

  const store = mockStore({
    session: {
      game: {
        gameId,
      },
      authUser: {
        uid: playerId,
      },
    },
    players: {
      [playerId]: {
        name: 'Player 1',
        avatar: DefaultAvatar,
      },
    },
  });
  const component = shallow(<Profile store={store} />).dive();
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

  it('Can update the player name', () => {
    const newName = 'Jeff';
    const nameInput = component.find('#profile-name');
    nameInput.simulate('change', { target: { value: newName } });
    expect(component.state('name')).toBe(newName);
  });

  describe('Saving', () => {
    const saveButton = component.find('#profile-save-player');
    jest.spyOn(playerActions, 'setPlayerName');
    jest.spyOn(playerActions, 'savePlayerName');
    jest.spyOn(playerActions, 'savePlayerAvatar');

    beforeEach(() => {
      playerActions.setPlayerName.mockClear();
      playerActions.savePlayerName.mockClear();
      playerActions.savePlayerAvatar.mockClear();
    });

    it('Can save', () => {
      const newName = 'New Name';
      component.setState({
        name: newName,
      });
      expect(playerActions.setPlayerName).not.toHaveBeenCalled();
      expect(playerActions.savePlayerName).not.toHaveBeenCalled();
      expect(playerActions.savePlayerAvatar).not.toHaveBeenCalled();
      saveButton.simulate('click');
      expect(playerActions.setPlayerName).toHaveBeenCalledWith(playerId, newName);
      expect(playerActions.savePlayerName).toHaveBeenCalledWith(playerId, newName, gameId);
      expect(playerActions.savePlayerAvatar).toHaveBeenCalledTimes(1);
    });

    it('Will not save an empty name', () => {
      component.setState({
        name: '',
      });
      const preventDefault = jest.fn();
      expect(playerActions.setPlayerName).not.toHaveBeenCalled();
      expect(playerActions.savePlayerName).not.toHaveBeenCalled();
      expect(playerActions.savePlayerAvatar).not.toHaveBeenCalled();
      saveButton.simulate('click', { preventDefault });
      expect(playerActions.setPlayerName).not.toHaveBeenCalled();
      expect(playerActions.savePlayerName).not.toHaveBeenCalled();
      expect(playerActions.savePlayerAvatar).not.toHaveBeenCalled();
      expect(preventDefault).toHaveBeenCalledTimes(1);
    });

    it('Will not save a name that is more than MAX_LENGTH', () => {
      component.setState({
        name: 'This is a name that is far too long',
      });
      const preventDefault = jest.fn();
      expect(playerActions.setPlayerName).not.toHaveBeenCalled();
      expect(playerActions.savePlayerName).not.toHaveBeenCalled();
      expect(playerActions.savePlayerAvatar).not.toHaveBeenCalled();
      saveButton.simulate('click', { preventDefault });
      expect(playerActions.setPlayerName).not.toHaveBeenCalled();
      expect(playerActions.savePlayerName).not.toHaveBeenCalled();
      expect(playerActions.savePlayerAvatar).not.toHaveBeenCalled();
      expect(preventDefault).toHaveBeenCalledTimes(1);
    });
  });

  describe('EditAvatarLinks', () => {
    it('Renders', () => {
      expect(shallow(<EditAvatarLinks avatar={DefaultAvatar} />)).toMatchSnapshot();
    });
  });
});
