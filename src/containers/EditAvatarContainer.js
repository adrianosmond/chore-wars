import React from 'react';
import { useHistory } from 'react-router-dom';
import { useUserId, usePlayersObj } from 'contexts/game';
import routes from 'constants/routes';
import AvatarCard from 'components/AvatarCard';

const EditAvatarContainer = ({ id }) => {
  const userId = useUserId();
  const player = usePlayersObj()[id];
  const history = useHistory();

  if (!player) {
    return null;
  }

  const url = player.avatar;

  const editAvatar =
    id === userId ? () => history.push(routes.EDIT_AVATAR) : null;
  return <AvatarCard editAvatar={editAvatar} url={url} />;
};

export default EditAvatarContainer;
