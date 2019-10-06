import React from 'react';
import LoginContainer from 'containers/LoginContainer';
import SignUpContainer from 'containers/SignUpContainer';
import Layout from 'components/Layout';

const UnauthenticatedPage = () => (
  <Layout
    authenticated={false}
    primary={
      <>
        <LoginContainer />
        <SignUpContainer />
      </>
    }
  />
);

export default UnauthenticatedPage;
