import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from 'avataaars';
import PropTypes from 'prop-types';

import { setPlayerName } from 'state/reducers/playersReducer';
import {
  startHoliday, stopHoliday, signOut, copyDummyData,
} from 'state/reducers/sessionReducer';

import { savePlayerName, savePlayerAvatar } from 'utils/database';
import { editorOrder, isEditable, labels } from 'constants/avatars';
import * as routes from 'constants/routes';
import { MAX_NAME_LENGTH } from 'constants/constants';

import Button from 'components/Button';
import Input from 'components/Input';

import './Profile.css';

const EditAvatarLinks = ({ avatar }) => (
  <div>
    { Object.keys(avatar)
      .sort((a, b) => editorOrder.indexOf(a) - editorOrder.indexOf(b))
      .map((key) => {
        if (editorOrder.indexOf(key) < 0 || !isEditable[key](avatar)) {
          return null;
        }
        return <Button to={`${routes.EDIT_PROFILE}/${key}`} variant="tertiary" key={key}>{labels[key]}</Button>;
      }) }
  </div>
);

EditAvatarLinks.propTypes = {
  avatar: PropTypes.objectOf(PropTypes.any).isRequired,
};

class Profile extends Component {
  static propTypes = {
    player: PropTypes.objectOf(PropTypes.any).isRequired,
    user: PropTypes.string.isRequired,
    gameId: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    holidayStartTime: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    copyData: PropTypes.func.isRequired,
    doSignOut: PropTypes.func.isRequired,
    doStartHoliday: PropTypes.func.isRequired,
    doStopHoliday: PropTypes.func.isRequired,
  };

  static defaultProps = {
    holidayStartTime: null,
  }

  constructor(props) {
    super(props);
    const { player: { avatar, name } } = props;
    this.state = {
      name,
      avatar,
    };
  }

  savePlayer = (event) => {
    const { user, gameId, setName } = this.props;
    const { avatar, name } = this.state;
    const trimmedName = name.trim();
    if (trimmedName.length > 0 && trimmedName.length <= MAX_NAME_LENGTH) {
      setName(user, name.trim());
      savePlayerName(user, name.trim(), gameId);
      savePlayerAvatar(user, avatar, gameId);
    } else {
      event.preventDefault();
      // TODO: validation
    }
  }

  render() {
    const { avatar, name } = this.state;
    const {
      gameId, holidayStartTime, copyData, doSignOut, doStartHoliday, doStopHoliday,
    } = this.props;
    if (!avatar) return null;
    return (
      <div className="profile-editor">
        <div className="profile-editor__column">
          <div className="profile-editor__avatar">
            <Avatar {...avatar} />
          </div>
          <div className="profile-editor__field">
            <label htmlFor="profile-name">Name:</label>
            <Input
              id="profile-name"
              placeholder="Name"
              maxLength={MAX_NAME_LENGTH}
              onChange={event => this.setState({ name: event.target.value })}
              value={name}
            />
            <div className="form__button-holder form__button-holder--tight">
              <Button to={routes.CHORES} variant="secondary">Cancel</Button>
              <Button to={routes.CHORES} id="profile-save-player" onClick={this.savePlayer}>
                Save
              </Button>
            </div>
            { process.env.NODE_ENV === 'development' ? (
              <Button variant="secondary" onClick={copyData}>Clone Data</Button>
            ) : null }
            { holidayStartTime ? (
              <Button
                onClick={() => doStopHoliday(gameId, holidayStartTime, new Date().getTime())}
                variant="tertiary"
              >
                Stop holiday
              </Button>
            ) : (
              <Button
                onClick={() => doStartHoliday(gameId, new Date().getTime())}
                variant="tertiary"
              >
                Start holiday
              </Button>
            )}
            <Button
              onClick={doSignOut}
              id="profile-sign-out"
              variant="tertiary"
            >
              Sign out
            </Button>
          </div>
        </div>
        <div className="profile-editor__column">
          <p className="profile-editor__field">Appearance:</p>
          <EditAvatarLinks avatar={avatar} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameId: state.session.game.gameId,
  holidayStartTime: state.session.holiday,
  user: state.session.authUser.uid,
  player: state.players[state.session.authUser.uid],
});

const mapDispatchToProps = dispatch => ({
  setName: (player, name) => dispatch(setPlayerName(player, name)),
  doStartHoliday: (game, startTime) => dispatch(startHoliday(game, startTime)),
  doStopHoliday: (game, startTime, endTime) => dispatch(stopHoliday(game, startTime, endTime)),
  doSignOut: () => dispatch(signOut()),
  copyData: () => dispatch(copyDummyData()),
});

export { EditAvatarLinks };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
