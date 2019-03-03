import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from 'avataaars';

import { setPlayerName } from 'state/reducers/playersReducer';
import {
  startHoliday, stopHoliday, signOut, copyDummyData,
} from 'state/reducers/sessionReducer';

import { savePlayerName, savePlayerAvatar } from 'utils/database';
import { editorOrder, isEditable, labels } from 'constants/avatars';
import * as routes from 'constants/routes';
import { MAX_NAME_LENGTH } from 'constants/constants';

import './Profile.css';

const EditAvatarLinks = ({ avatar }) => (
  <div>
    { Object.keys(avatar)
      .sort((a, b) => editorOrder.indexOf(a) - editorOrder.indexOf(b))
      .map((key) => {
        if (editorOrder.indexOf(key) < 0 || !isEditable[key](avatar)) {
          return null;
        }
        return <Link to={`${routes.EDIT_PROFILE}/${key}`} className="form__button form__button--tertiary" key={key}>{labels[key]}</Link>;
      }) }
  </div>
);

class Profile extends Component {
  constructor(props) {
    super(props);
    const { avatar, name } = props.player;
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
            <input
              className="form__input"
              id="profile-name"
              placeholder="Name"
              type="text"
              maxLength={MAX_NAME_LENGTH}
              onChange={event => this.setState({ name: event.target.value })}
              value={name}
            />
            <div className="form__button-holder form__button-holder--tight">
              <Link to={routes.CHORES} className="form__button form__button--secondary">Cancel</Link>
              <Link
                to={routes.CHORES}
                className="form__button form__button"
                id="profile-save-player"
                onClick={this.savePlayer}
              >
                Save
              </Link>
            </div>
            { process.env.NODE_ENV === 'development' ? (
              <button
                type="button"
                onClick={copyData}
                className="form__button form__button--secondary"
              >
                Clone Data
              </button>
            ) : null }
            { holidayStartTime ? (
              <button
                type="button"
                onClick={() => {
                  doStopHoliday(gameId, holidayStartTime, new Date().getTime());
                }}
                className="form__button form__button--tertiary"
              >
                Stop holiday

              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  doStartHoliday(gameId, new Date().getTime());
                }}
                className="form__button form__button--tertiary"
              >
                Start holiday
              </button>
            )}
            <button
              type="button"
              onClick={doSignOut}
              id="profile-sign-out"
              className="form__button form__button--tertiary"
            >
              Sign out
            </button>
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
