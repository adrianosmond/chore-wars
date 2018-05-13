import React from 'react';

import SetupGame from 'components/SetupGame';
import withAuthorization from 'components/withAuthorization';

const NoGame = props =>
  <SetupGame history={props.history} />;

const authCondition = authUser => !!authUser;
const isLoading = () => false;

export default withAuthorization(authCondition, isLoading)(NoGame);
