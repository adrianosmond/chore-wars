import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from 'avataaars';

import { setPlayerName, savePlayerName, savePlayerAvatar } from 'actions/playerActions';
import { signOut } from 'actions/sessionActions';

import { editorOrder, isEditable, labels } from 'constants/avatars';
import * as routes from 'constants/routes';
import { MAX_NAME_LENGTH } from 'constants/constants';

import './Profile.css';

const EditAvatarLinks = ({ avatar }) =>
  <div>
  { Object.keys(avatar)
      .sort((a, b) => editorOrder.indexOf(a) - editorOrder.indexOf(b))
      .map((key) => {
        if (editorOrder.indexOf(key) < 0 || !isEditable[key](avatar)) {
          return null;
        }
        return <Link to={`${routes.EDIT_PROFILE}/${key}`}className="form__button form__button--tertiary" key={key}>{labels[key]}</Link>;
      }) }
  </div>;

class Profile extends Component {
  constructor(props) {
    super(props);
    const { avatar, name } = props.player;
    this.state = {
      name,
      avatar,
    };
  }

  savePlayer(event) {
    const { user, gameId } = this.props;
    const { avatar, name } = this.state;
    const trimmedName = name.trim();
    if (trimmedName.length > 0 && trimmedName.length <= MAX_NAME_LENGTH) {
      this.props.setPlayerName(user, name.trim(), gameId);
      this.props.savePlayerName(user, name.trim(), gameId);
      this.props.savePlayerAvatar(user, avatar, gameId);
    } else {
      event.preventDefault();
      // TODO: validation
    }
  }

  render() {
    const { avatar } = this.state;
    if (!avatar) return null;
    return (
      <div className="profile-editor">
        <div className="profile-editor__column">
          <div className="profile-editor__avatar">
            <Avatar { ...avatar } />
          </div>
          <div className="profile-editor__field">
            <label htmlFor="name">Name:</label>
            <input className="form__input" id="name" placeholder="Name" type="text"
              maxLength={MAX_NAME_LENGTH}
              onChange={event => this.setState({ name: event.target.value })}
              value={this.state.name} />
            <div className="form__button-holder form__button-holder--tight">
              <Link to={routes.CHORES} className="form__button form__button--secondary">Cancel</Link>
              <Link to={routes.CHORES} className="form__button form__button"
                onClick={this.savePlayer.bind(this)}>Save</Link>
            </div>
            <button onClick={() => { this.props.doSignOut(); }}
              id="profile-sign-out"
              className="form__button form__button--tertiary">Sign out</button>
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
  user: state.session.authUser.uid,
  player: state.players[state.session.authUser.uid],
});

const mapDispatchToProps = dispatch => ({
  setPlayerName: (player, name, game) => dispatch(setPlayerName(player, name, game)),
  savePlayerName: (player, name, game) => dispatch(savePlayerName(player, name, game)),
  savePlayerAvatar: (player, avatar, game) => dispatch(savePlayerAvatar(player, avatar, game)),
  doSignOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
