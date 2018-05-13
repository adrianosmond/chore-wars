import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from 'avataaars';

import { updateUserName, saveUserName, saveUserAvatar } from 'actions/pointActions';

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
    const { avatar, name } = props.points[props.user];
    this.state = {
      name,
      avatar,
    };
  }

  saveUser(event) {
    const { user, gameId } = this.props;
    const { avatar, name } = this.state;
    const trimmedName = name.trim();
    if (trimmedName.length > 0 && trimmedName.length <= MAX_NAME_LENGTH) {
      this.props.updateUserName(user, name.trim(), gameId);
      this.props.saveUserName(user, name.trim(), gameId);
      this.props.saveUserAvatar(user, avatar, gameId);
    } else {
      event.preventDefault();
      // TODO: validation
    }
  }

  render() {
    const { avatar } = this.state;
    if (!avatar) return null;
    return (
      <div className="app profile-editor">
        <div>
          <div className="profile-editor__avatar">
            <Avatar { ...avatar } />
          </div>
          <div className="profile-editor__field">
            <label htmlFor="name">Name:</label>
            <input className="form__input" id="name" placeholder="Name" type="text"
              maxLength={MAX_NAME_LENGTH}
              onChange={event => this.setState({ name: event.target.value })}
              value={this.state.name} />
          </div>
          <EditAvatarLinks avatar={avatar} />
          <div className="form__button-holder form__button-holder--tight">
            <Link to={routes.CHORES} className="form__button form__button--secondary">Cancel</Link>
            <Link to={routes.CHORES} className="form__button form__button"
              onClick={this.saveUser.bind(this)}>Save</Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  gameId: state.session.game.gameId,
  user: state.session.authUser.uid,
  points: state.points.present,
});

const mapDispatchToProps = dispatch => ({
  updateUserName: (user, name, game) => dispatch(updateUserName(user, name, game)),
  saveUserName: (user, name, game) => dispatch(saveUserName(user, name, game)),
  saveUserAvatar: (user, avatar, game) => dispatch(saveUserAvatar(user, avatar, game)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
