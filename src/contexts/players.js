import React, { useState, useContext, useEffect, createContext } from 'react';
import { database } from 'database';
import { makePlayersArray } from 'utils/players';
import Loading from 'components/Loading';
import { useGame } from './game';

const PlayersContext = createContext();

export const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const game = useGame();

  useEffect(() => {
    if (!game && isLoading) {
      setIsLoading(false);
      return () => {};
    }
    const playersPath = `games/${game}/players`;
    const updatePlayers = result => {
      setPlayers(makePlayersArray(result.val()));
      if (isLoading) {
        setIsLoading(false);
      }
    };
    database.ref(playersPath).on('value', updatePlayers);
    return () => database.ref(playersPath).off('value', updatePlayers);
  }, [game, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <PlayersContext.Provider value={players}>
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayers = () => useContext(PlayersContext);
