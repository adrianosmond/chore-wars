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
import ProtectedRoute from 'components/ProtectedRoute';

const ChoreChainPage = lazy(() => import('pages/ChoreChainPage'));

const App = () => (
  <Suspense fallback={<Loading />}>
    <Router>
      <Switch>
        <Route exact path={routes.HOME} component={HomePage} />
        <ProtectedRoute
          exact
          path={routes.NEW_CHORE}
          component={NewChorePage}
        />
        <ProtectedRoute
          exact
          path={routes.MANAGE_CHAINS}
          component={ChoreChainPage}
        />
        <ProtectedRoute
          exact
          path={routes.SINGLE_CHORE}
          component={SingleChorePage}
        />
        <ProtectedRoute
          exact
          path={routes.EDIT_CHORE}
          component={EditChorePage}
        />
        <ProtectedRoute
          exact
          path={routes.FORGOT_TO_LOG}
          component={ForgotToLogPage}
        />
        <Redirect to={routes.HOME} />
      </Switch>
    </Router>
  </Suspense>
);

export default App;
