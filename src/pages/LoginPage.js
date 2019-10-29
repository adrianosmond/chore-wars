import React from 'react';
import LoginContainer from 'containers/LoginContainer';
import Layout from 'components/Layout';

const LoginPage = () => {
  return <Layout secondary={<LoginContainer />} />;
};

export default LoginPage;
