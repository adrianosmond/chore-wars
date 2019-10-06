import React from 'react';
import NoGameContainer from 'containers/NoGameContainer';
import Layout from 'components/Layout';

const NoGamePage = () => {
  return <Layout authenticated={false} primary={<NoGameContainer />} />;
};

export default NoGamePage;
