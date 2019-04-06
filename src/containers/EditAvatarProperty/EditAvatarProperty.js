import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AvatarGrid from 'components/AvatarGrid';
import Button from 'components/Button';

import { savePlayerAvatar } from 'utils/database';

import * as routes from 'constants/routes';

const EditAvatarProperty = ({
  user, player, match,
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
          savePlayerAvatar(user, {
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
};

const mapStateToProps = state => ({
  user: state.session.authUser.uid,
  player: state.players[state.session.authUser.uid],
});

export default connect(mapStateToProps)(EditAvatarProperty);
