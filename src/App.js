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
import LogChoreCompletion from './containers/LogChoreCompletion';
import ChoreChain from './containers/ChoreChain';
import ProfileEditor from './containers/ProfileEditor';

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
      <Route exact path={`${routes.LOG_PAST_COMPLETION}/:slug`} component={LogChoreCompletion} />
      <Route exact path={routes.NEW_CHAIN} component={ChoreChain} />
      <Route exact path={routes.PROFILE_EDITOR} component={ProfileEditor} />
    </Switch>
  </Router>
);

export default App;
