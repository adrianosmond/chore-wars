import React, { useState, useEffect, useContext, createContext } from 'react';
import { database } from 'database';
import Loading from 'components/Loading';
import { useUser } from './user';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [game, setGame] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return () => {};
    }

    const ref = database.ref(`users/${user}`);
    const onUserChange = result => {
      const userData = result.val();
      if (userData && userData.gameId) {
        setGame(userData.gameId);
      } else {
        setGame(null);
      }
      setIsLoading(false);
    };

    ref.on('value', onUserChange);
    return () => ref.off('value', onUserChange);
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
