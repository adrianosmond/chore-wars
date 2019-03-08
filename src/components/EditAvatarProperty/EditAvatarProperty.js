import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AvatarGrid from 'components/AvatarGrid';
import Button from 'components/Button';

import { setPlayerAvatar } from 'state/reducers/playersReducer';

import * as routes from 'constants/routes';


const EditAvatarProperty = ({
  user, player, match, doSetPlayerAvatar,
}) => {
  const { avatar } = player;
  const { propertyToEdit } = match.params;
  return (
    <div>
      <Button to={routes.EDIT_PROFILE} variant="secondary">Back</Button>
      <AvatarGrid
        avatar={avatar}
        editing={propertyToEdit}
        onSelect={(newValue) => {
          doSetPlayerAvatar(user, {
            ...avatar,
            [propertyToEdit]: newValue,
          });
        }}
      />
      <Button to={routes.EDIT_PROFILE} variant="secondary">Back</Button>
    </div>
  );
};

EditAvatarProperty.propTypes = {
  user: PropTypes.string.isRequired,
  player: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  doSetPlayerAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  user: state.session.authUser.uid,
  player: state.players[state.session.authUser.uid],
});

const mapDispatchToProps = dispatch => ({
  doSetPlayerAvatar: (user, avatar) => dispatch(setPlayerAvatar(user, avatar)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditAvatarProperty);
