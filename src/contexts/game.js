import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext,
} from 'react';
import { auth, database } from 'database';
import { makePlayersArray } from 'utils/players';
import { makeChoresArray } from 'utils/chores';
import Loading from 'components/Loading';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [game, setGame] = useState(null);
  const [holiday, setHoliday] = useState(null);
  const [players, setPlayers] = useState(null);
  const [chores, setChores] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser.uid);
      } else {
        setUser(false);
      }
    });
  }, []);

  useEffect(() => {
    if (!user) {
      if (user === false) {
        setIsLoading(false);
      }
      return () => {};
    }

    const ref = database.ref(`users/${user}`);
    const onUserChange = result => {
      const userData = result.val();
      if (userData && userData.gameId) {
        setGame(userData.gameId);
      } else {
        setGame(false);
      }
    };

    ref.on('value', onUserChange);
    return () => ref.off('value', onUserChange);
  }, [user]);

  useEffect(() => {
    if (!game) {
      return () => {};
    }

    const onHolidayChange = result => {
      setHoliday(result.val());
    };
    database.ref(`games/${game}/holiday`).on('value', onHolidayChange);
    return () =>
      database.ref(`games/${game}/holiday`).off('value', onHolidayChange);
  }, [game]);

  useEffect(() => {
    if (!game) {
      return () => {};
    }
    const playersPath = `games/${game}/players`;
    const updatePlayers = result => {
      setPlayers(makePlayersArray(result.val()));
    };
    database.ref(playersPath).on('value', updatePlayers);
    return () => database.ref(playersPath).off('value', updatePlayers);
  }, [game]);

  useEffect(() => {
    if (!game) {
      return () => {};
    }
    const choresPath = `games/${game}/chores`;
    const updateChores = result => {
      setChores(makeChoresArray(result.val() || {}));
    };
    database.ref(choresPath).on('value', updateChores);
    return () => database.ref(choresPath).off('value', updateChores);
  }, [game]);

  useEffect(() => {
    if (players && chores) {
      setIsLoading(false);
    }
  }, [players, chores]);

  const value = useMemo(
    () => ({
      user,
      game,
      holiday,
      players,
      chores,
    }),
    [chores, game, holiday, players, user],
  );

  if (isLoading) {
    return <Loading />;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useUser = () => useContext(GameContext).user;
export const useGame = () => useContext(GameContext).game;
export const useHoliday = () => useContext(GameContext).holiday;
export const usePlayers = () => useContext(GameContext).players;
export const useChores = () => useContext(GameContext).chores;
