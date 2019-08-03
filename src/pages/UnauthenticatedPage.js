import React from 'react';
import LoginContainer from 'containers/LoginContainer';
import SignUpContainer from 'containers/SignUpContainer';
import Layout from 'components/Layout';

const HomePage = () => (
  <Layout
    primary={
      <>
        <LoginContainer />
        <SignUpContainer />
      </>
    }
  />
);

export default HomePage;
