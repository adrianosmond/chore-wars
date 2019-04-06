import React from 'react';
import { shallow } from 'enzyme';
import { DefaultAvatar } from 'constants/avatars';
import { savePlayerAvatar, savePlayerName } from 'utils/database';
import Button from 'components/Button';
import { EditAvatarLinks, Component as Profile } from './Profile';

const signOutMock = jest.fn();
const copyDataMock = jest.fn();
const startHolidayMock = jest.fn();
const stopHolidayMock = jest.fn();

describe('Profile', () => {
  const playerId = 'player1';
  const gameId = 'fake-game';
  const component = shallow(
    <Profile
      gameId={gameId}
      user={playerId}
      player={{
        name: 'Player 1',
        avatar: DefaultAvatar,
      }}
      doSignOut={signOutMock}
      doStartHoliday={startHolidayMock}
      doStopHoliday={stopHolidayMock}
      copyData={copyDataMock}
    />,
  );

  it('Renders', () => {
    expect(component).toMatchSnapshot();
  });

  it('Can sign out', () => {
    const signOutButton = component.find(Button).at(3);
    expect(signOutMock).not.toHaveBeenCalled();
    signOutButton.simulate('click');
    expect(signOutMock).toHaveBeenCalledTimes(1);
  });

  it('Can update the player name', () => {
    const newName = 'Jeff';
    const nameInput = component.find('#profile-name');
    nameInput.simulate('change', { target: { value: newName } });
    expect(component.state('name')).toBe(newName);
  });

  describe('Saving', () => {
    const saveButton = component.find('#profile-save-player');

    beforeEach(() => {
      savePlayerName.mockClear();
      savePlayerAvatar.mockClear();
    });

    it('Can save', () => {
      const newName = 'New Name';
      component.setState({
        name: newName,
      });
      expect(savePlayerName).not.toHaveBeenCalled();
      expect(savePlayerAvatar).not.toHaveBeenCalled();
      saveButton.simulate('click');
      expect(savePlayerName).toHaveBeenCalledWith(playerId, newName, gameId);
      expect(savePlayerAvatar).toHaveBeenCalledTimes(1);
    });

    it('Will not save an empty name', () => {
      component.setState({
        name: '',
      });
      const preventDefault = jest.fn();
      expect(savePlayerName).not.toHaveBeenCalled();
      expect(savePlayerAvatar).not.toHaveBeenCalled();
      saveButton.simulate('click', { preventDefault });
      expect(savePlayerName).not.toHaveBeenCalled();
      expect(savePlayerAvatar).not.toHaveBeenCalled();
      expect(preventDefault).toHaveBeenCalledTimes(1);
    });

    it('Will not save a name that is more than MAX_LENGTH', () => {
      component.setState({
        name: 'This is a name that is far too long',
      });
      const preventDefault = jest.fn();
      expect(savePlayerName).not.toHaveBeenCalled();
      expect(savePlayerAvatar).not.toHaveBeenCalled();
      saveButton.simulate('click', { preventDefault });
      expect(savePlayerName).not.toHaveBeenCalled();
      expect(savePlayerAvatar).not.toHaveBeenCalled();
      expect(preventDefault).toHaveBeenCalledTimes(1);
    });
  });

  describe('EditAvatarLinks', () => {
    it('Renders', () => {
      expect(shallow(<EditAvatarLinks avatar={DefaultAvatar} />)).toMatchSnapshot();
    });
  });
});
