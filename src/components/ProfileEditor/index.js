import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Avatar from 'avataaars';

import AvatarGrid from '../AvatarGrid';
import withAuthorization from '../withAuthorization';

import { updateUser } from '../../actions/pointActions';

import { editorOrder, isEditable, labels } from '../../constants/avatars';
import * as routes from '../../constants/routes';

import './index.css';

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
    this.props.updateUser(user, name, avatar, gameId);
    this.props.history.push(routes.CHORES);
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
          { !editing ? Object.keys(avatar)
            .sort((a, b) => editorOrder.indexOf(a) - editorOrder.indexOf(b))
            .map((key) => {
              if (editorOrder.indexOf(key) >= 0 && isEditable[key](avatar)) {
                return <button className="form__button" onClick={() =>
                  this.setState({ editing: key })} key={key}>{labels[key]}</button>;
              }
              return null;
            })
          : <div>
              <button className="form__button form__button--secondary"
                onClick={() => this.setState({ editing: null })}>Back</button>
              <AvatarGrid avatar={avatar} editing={editing}
                updateAvatar={this.updateAvatar.bind(this)} />
            </div>}
          { !editing ?
            <button className="form__button form__button--secondary"
              onClick={this.saveUser.bind(this)}>Save</button> : null }
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
