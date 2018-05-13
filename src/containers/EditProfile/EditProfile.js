import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Profile from 'components/Profile';
import EditAvatarProperty from 'components/EditAvatarProperty';
import withAuthorization from 'components/withAuthorization';

import * as routes from 'constants/routes';

const EditProfile = () =>
  <div className="app">
    <Switch>
      <Route exact path={routes.EDIT_PROFILE} component={Profile} />
      <Route path={`${routes.EDIT_PROFILE}/:propertyToEdit`} component={EditAvatarProperty} />
    </Switch>
  </div>;

const authCondition = authUser => !!authUser;
const isLoading = state => !state.pointsLoaded;

export default withAuthorization(authCondition, isLoading)(EditProfile);
