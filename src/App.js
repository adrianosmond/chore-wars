import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Login from './containers/Login';
import SignUp from './containers/SignUp';
import NoGame from './containers/NoGame';
import Chores from './containers/Chores';
import NewChore from './containers/NewChore';
import EditChore from './containers/EditChore';
import LogPastCompletion from './containers/LogPastCompletion';
import NewChain from './containers/NewChain';
import EditProfile from './containers/EditProfile';

import * as routes from './constants/routes';

const App = () => (
  <Router>
    <Switch>
      <Route exact path={routes.LOGIN} component={Login} />
      <Route exact path={routes.SIGN_UP} component={SignUp} />
      <Route exact path={routes.NO_GAME} component={NoGame} />
      <Route exact path={routes.CHORES} component={Chores} />
      <Route exact path={routes.NEW_CHORE} component={NewChore} />
      <Route exact path={`${routes.EDIT_CHORE}/:slug`} component={EditChore} />
      <Route exact path={`${routes.LOG_PAST_COMPLETION}/:slug`} component={LogPastCompletion} />
      <Route exact path={routes.NEW_CHAIN} component={NewChain} />
      <Route path={routes.EDIT_PROFILE} component={EditProfile} />
    </Switch>
  </Router>
);

export default App;
