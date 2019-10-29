import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useUser, useGame } from 'contexts/game';
import routes from 'constants/routes';

export const ProtectedRoute = props => {
  const user = useUser();
  const game = useGame();
  if (!user) return <Redirect to={routes.HOME} />;
  if (!game) return <Redirect to={routes.NO_GAME} />;
  return <Route {...props} />;
};

export const UnprotectedRoute = props => {
  const user = useUser();
  const game = useGame();
  if (user || game) return <Redirect to={routes.HOME} />;
  return <Route {...props} />;
};
