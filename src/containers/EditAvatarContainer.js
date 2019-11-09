import React from 'react';
import { useHistory } from 'react-router-dom';
import { useUserId } from 'contexts/game';
import routes from 'constants/routes';
import AvatarCard from 'components/AvatarCard';

const EditAvatarContainer = ({ id }) => {
  const userId = useUserId();
  const history = useHistory();
  const editAvatar =
    id === userId ? () => history.push(routes.EDIT_AVATAR) : null;
  return <AvatarCard editAvatar={editAvatar} />;
};

export default EditAvatarContainer;
