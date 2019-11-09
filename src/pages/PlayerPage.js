import React from 'react';
import PlayerProfileContainer from 'containers/PlayerProfileContainer';
import EditAvatarContainer from 'containers/EditAvatarContainer';
import Layout from 'components/Layout';

const PlayerPage = ({
  match: {
    params: { id },
  },
}) => {
  return (
    <Layout
      primary={<PlayerProfileContainer id={id} />}
      secondary={<EditAvatarContainer id={id} />}
    />
  );
};

export default PlayerPage;
