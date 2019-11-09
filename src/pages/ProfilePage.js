import React from 'react';
import { useUserId } from 'contexts/game';
import EditPersonalDetailsContainer from 'containers/EditPersonalDetailsContainer';
import EditLoginDetailsContainer from 'containers/EditLoginDetailsContainer';
import Typography from 'components/Typography';
import EditAvatarContainer from 'containers/EditAvatarContainer';
import Layout from 'components/Layout';

const ProfilePage = () => {
  const userId = useUserId();
  return (
    <Layout
      primary={
        <>
          <Typography appearance="h1">Profile</Typography>
          <EditPersonalDetailsContainer />
          <EditLoginDetailsContainer />
        </>
      }
      secondary={<EditAvatarContainer id={userId} />}
    />
  );
};

export default ProfilePage;
