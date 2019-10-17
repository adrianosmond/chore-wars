import React from 'react';
import ProfileContainer from 'containers/ProfileContainer';
import EditAvatarContainer from 'containers/EditAvatarContainer';
import Layout from 'components/Layout';

const ProfilePage = () => (
  <Layout primary={<ProfileContainer />} secondary={<EditAvatarContainer />} />
);

export default ProfilePage;
