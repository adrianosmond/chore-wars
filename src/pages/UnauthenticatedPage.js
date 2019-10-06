import React from 'react';
import LoginContainer from 'containers/LoginContainer';
import SignUpContainer from 'containers/SignUpContainer';
import Layout from 'components/Layout';
import Flexer from 'components/Flexer';
import Center from 'components/Center';

const UnauthenticatedPage = () => (
  <Layout
    primary={
      <Flexer>
        <LoginContainer />
        <Center>or</Center>
        <SignUpContainer />
      </Flexer>
    }
  />
);

export default UnauthenticatedPage;
