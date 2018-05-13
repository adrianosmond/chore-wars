import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AvatarGrid from '../AvatarGrid';

import { updateUserAvatar } from '../../actions/pointActions';

import * as routes from '../../constants/routes';

const EditAvatarProperty = (props) => {
  const { user, gameId, points } = props;
  const { avatar } = points[user];
  const { propertyToEdit } = props.match.params;
  return (
    <div>
      <Link to={routes.EDIT_PROFILE} className="form__button form__button--secondary">Back</Link>
      <AvatarGrid avatar={avatar}
        editing={propertyToEdit}
        onSelect={(newValue) => {
          props.updateUserAvatar(user, {
            ...avatar,
            [propertyToEdit]: newValue,
          }, gameId);
        }} />
      <Link to={routes.EDIT_PROFILE} className="form__button form__button--secondary">Back</Link>
    </div>
  );
};

const mapStateToProps = state => ({
  gameId: state.session.game.gameId,
  user: state.session.authUser.uid,
  points: state.points.present,
});

const mapDispatchToProps = dispatch => ({
  updateUserAvatar: (user, avatar, game) => dispatch(updateUserAvatar(user, avatar, game)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAvatarProperty);
