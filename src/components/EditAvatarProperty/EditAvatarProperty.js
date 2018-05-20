import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AvatarGrid from 'components/AvatarGrid';

import { setPlayerAvatar } from 'actions/playerActions';

import * as routes from 'constants/routes';

const EditAvatarProperty = (props) => {
  const { user, player } = props;
  const { avatar } = player;
  const { propertyToEdit } = props.match.params;
  return (
    <div>
      <Link to={routes.EDIT_PROFILE} className="form__button form__button--secondary">Back</Link>
      <AvatarGrid avatar={avatar}
        editing={propertyToEdit}
        onSelect={(newValue) => {
          props.setPlayerAvatar(user, {
            ...avatar,
            [propertyToEdit]: newValue,
          });
        }} />
      <Link to={routes.EDIT_PROFILE} className="form__button form__button--secondary">Back</Link>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.session.authUser.uid,
  player: state.players[state.session.authUser.uid],
});

const mapDispatchToProps = dispatch => ({
  setPlayerAvatar: (user, avatar) => dispatch(setPlayerAvatar(user, avatar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAvatarProperty);
