import React from 'react';
import LoginContainer from 'containers/LoginContainer';
import SignUpContainer from 'containers/SignUpContainer';
import Layout from 'components/Layout';
import Flexer from 'components/Flexer';

const UnauthenticatedPage = () => (
  <Layout
    primary={
      <Flexer>
        <LoginContainer />
        <SignUpContainer />
      </Flexer>
    }
  />
);

export default UnauthenticatedPage;
