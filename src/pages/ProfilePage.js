import React from 'react';
import EditPersonalDetailsContainer from 'containers/EditPersonalDetailsContainer';
import EditLoginDetailsContainer from 'containers/EditLoginDetailsContainer';
import Typography from 'components/Typography';
import EditAvatarContainer from 'containers/EditAvatarContainer';
import Layout from 'components/Layout';

const ProfilePage = () => (
  <Layout
    primary={
      <>
        <Typography appearance="h1">Profile</Typography>
        <EditPersonalDetailsContainer />
        <EditLoginDetailsContainer />
      </>
    }
    secondary={<EditAvatarContainer />}
  />
);

export default ProfilePage;
