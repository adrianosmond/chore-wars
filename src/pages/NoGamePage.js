import React from 'react';
import NoGameContainer from 'containers/NoGameContainer';
import Layout from 'components/Layout';

const NoGamePage = () => {
  return <Layout primary={<NoGameContainer />} />;
};

export default NoGamePage;
