import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Avatar from 'avataaars';

import AvatarGrid from '../AvatarGrid';
import withAuthorization from '../withAuthorization';

import { updateUser } from '../../actions/pointActions';

import { editorOrder, isEditable, labels } from '../../constants/avatars';
import * as routes from '../../constants/routes';

import './index.css';

const MAX_NAME_LENGTH = 12;

class ProfileEditor extends Component {
  constructor(props) {
    super(props);
    const { avatar, name } = props.points[props.user];
    this.state = {
      name,
      editing: null,
      avatar,
    };
  }

  updateAvatar(property, value) {
    this.setState({
      avatar: {
        ...this.state.avatar,
        [property]: value,
      },
    });
  }

  saveUser() {
    const { user, gameId } = this.props;
    const { avatar, name } = this.state;
    const trimmedName = name.trim();
    if (trimmedName.length > 0 && trimmedName.length < MAX_NAME_LENGTH) {
      this.props.updateUser(user, name.trim(), avatar, gameId);
      this.props.history.push(routes.CHORES);
    } else {
      // TODO: validation
    }
  }

  render() {
    const { avatar, editing } = this.state;
    if (!avatar) return null;
    return (
      <div className="profile-editor">
        <div className="profile-editor__avatar">
          <Avatar { ...avatar } />
        </div>
        <div className="profile-editor__editor">
          { !editing ?
            <div>
              <div style={{ marginTop: '1rem' }}>
                <label htmlFor="name">Name:</label>
                <input className="form__input" id="name" placeholder="Name" type="text" maxLength={MAX_NAME_LENGTH} onChange={event => this.setState({ name: event.target.value })} value={this.state.name} />
              </div>
              {Object.keys(avatar)
                .sort((a, b) => editorOrder.indexOf(a) - editorOrder.indexOf(b))
                .map((key) => {
                  if (editorOrder.indexOf(key) >= 0 && isEditable[key](avatar)) {
                    return <button className="form__button" onClick={() =>
                      this.setState({ editing: key })} key={key}>{labels[key]}</button>;
                  }
                  return null;
                })}
            </div>
          : <div>
              <button className="form__button form__button--secondary"
                onClick={() => this.setState({ editing: null })}>Back</button>
              <AvatarGrid avatar={avatar} editing={editing}
                updateAvatar={this.updateAvatar.bind(this)} />
            </div>}
          { !editing ?
            <div className="form__button-holder">
              <Link to={routes.CHORES} className="form__button form__button--secondary">Back</Link>
              <button className="form__button form__button"
                onClick={this.saveUser.bind(this)}>Save</button>
            </div> : null }
        </div>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;
const isLoading = state => !state.pointsLoaded;

const mapStateToProps = state => ({
  gameId: state.session.game.gameId,
  points: state.points.present,
  user: state.session.authUser.uid,
});

const mapDispatchToProps = dispatch => ({
  updateUser: (user, name, avatar, game) => dispatch(updateUser(user, name, avatar, game)),
});

export default compose(
  withAuthorization(authCondition, isLoading),
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
)(ProfileEditor);
