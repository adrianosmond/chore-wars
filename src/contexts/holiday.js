import React, { useState, useContext, useEffect, createContext } from 'react';
import { database } from 'database';
import Loading from 'components/Loading';
import { useGame } from './game';

const HolidayContext = createContext();

export const HolidayProvider = ({ children }) => {
  const [players, setHoliday] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const game = useGame();

  useEffect(() => {
    const onHolidayChange = result => {
      setHoliday(result.val());
      setIsLoading(false);
    };
    database.ref(`games/${game}/holiday`).on('value', onHolidayChange);
    return () =>
      database.ref(`games/${game}/holiday`).off('value', onHolidayChange);
  }, [game, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <HolidayContext.Provider value={players}>
      {children}
    </HolidayContext.Provider>
  );
};

export const useHoliday = () => useContext(HolidayContext);
