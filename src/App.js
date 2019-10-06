import React, { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import routes from 'constants/routes';
import HomePage from 'pages/HomePage';
import NewChorePage from 'pages/NewChorePage';
import SingleChorePage from 'pages/SingleChorePage';
import EditChorePage from 'pages/EditChorePage';
import ForgotToLogPage from 'pages/ForgotToLogPage';
import Loading from 'components/Loading';

const ChoreChainPage = lazy(() => import('pages/ChoreChainPage'));

const App = () => (
  <Suspense fallback={<Loading />}>
    <Router>
      <Switch>
        <Route exact path={routes.HOME} component={HomePage} />
        <Route exact path={routes.NEW_CHORE} component={NewChorePage} />
        <Route exact path={routes.MANAGE_CHAINS} component={ChoreChainPage} />
        <Route exact path={routes.SINGLE_CHORE} component={SingleChorePage} />
        <Route exact path={routes.EDIT_CHORE} component={EditChorePage} />
        <Route exact path={routes.FORGOT_TO_LOG} component={ForgotToLogPage} />
        <Redirect to={routes.HOME} />
      </Switch>
    </Router>
  </Suspense>
);

export default App;
