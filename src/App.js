import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Login from './components/Login'
import Chores from './components/Chores'
import NewChore from './components/NewChore'
import EditChore from './components/EditChore'

import * as routes from './constants/routes'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={routes.LOGIN} component={Login} />
          <Route exact path={routes.CHORES} component={Chores} />
          <Route exact path={routes.NEW_CHORE} component={NewChore} />
          <Route exact path={`${routes.EDIT_CHORE}/:slug`} component={EditChore} />
        </Switch>
      </Router>
    )
  }
}

export default App
