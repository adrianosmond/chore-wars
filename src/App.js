import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Login from './components/Login';
import Chores from './components/Chores';
import NewChore from './components/NewChore';
import EditChore from './components/EditChore';
import LogChoreCompletion from './components/LogChoreCompletion';
import ChoreChain from './components/ChoreChain';
import ProfileEditor from './components/ProfileEditor';

import * as routes from './constants/routes';

const App = () => (
  <Router>
    <Switch>
      <Route exact path={routes.LOGIN} component={Login} />
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
