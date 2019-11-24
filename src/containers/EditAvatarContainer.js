import React from 'react';
import { useHistory } from 'react-router-dom';
import { useUserId, usePlayersObj } from 'contexts/game';
import routes from 'constants/routes';
import AvatarCard from 'components/AvatarCard';

const EditAvatarContainer = ({ id }) => {
  const userId = useUserId();
  const url = usePlayersObj()[id].avatar;
  console.log(url);
  const history = useHistory();
  const editAvatar =
    id === userId ? () => history.push(routes.EDIT_AVATAR) : null;
  return <AvatarCard editAvatar={editAvatar} url={url} />;
};

export default EditAvatarContainer;
