import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  createContext,
} from 'react';
import { database } from 'database';
import { makeChoresArray } from 'utils/chores';
import Loading from 'components/Loading';
import { useGame } from './game';

const ChoresContext = createContext();

export const ChoresProvider = ({ children }) => {
  const [chores, setChores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const game = useGame();

  useEffect(() => {
    if (!game) {
      setIsLoading(false);
      return () => {};
    }
    const choresPath = `games/${game}/chores`;
    const updateChores = result => {
      setChores(makeChoresArray(result.val() || {}));
      if (isLoading) {
        setIsLoading(false);
      }
    };
    database.ref(choresPath).on('value', updateChores);
    return () => database.ref(choresPath).off('value', updateChores);
  }, [game, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ChoresContext.Provider value={chores}>{children}</ChoresContext.Provider>
  );
};

export const useChores = () => useContext(ChoresContext);

export const useMarkChoreAsDone = () => {
  const game = useGame();
  return useCallback(() => game, [game]);
};
