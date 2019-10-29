import React from 'react';
import SignUpContainer from 'containers/SignUpContainer';
import Layout from 'components/Layout';

const UnauthenticatedPage = () => <Layout secondary={<SignUpContainer />} />;

export default UnauthenticatedPage;
