import React from 'react';
import UnauthenticatedPage from 'pages/UnauthenticatedPage';
import NoGamePage from 'pages/NoGamePage';
import ChoresPage from 'pages/ChoresPage';
import { useUserId, useGame } from 'contexts/game';

const HomePage = () => {
  const user = useUserId();
  const game = useGame();

  if (!user) {
    return <UnauthenticatedPage />;
  }

  if (!game) {
    return <NoGamePage />;
  }

  return <ChoresPage />;
};

export default HomePage;
