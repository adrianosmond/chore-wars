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
  const [playersObj, setPlayersObj] = useState(null);
  const [chores, setChores] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged(authUser => {
      if (authUser) {
        // For login we need to set loading to true again
        // (the auth state changes from !authUser to authUser)
        // as we're going to display some routes that aren't yet ready
        // until we pull game, player and chore info
        setIsLoading(true);
        setUser(authUser);
      } else {
        // reset everything in case this change comes from a logout
        setUser(false);
        setGame(false);
        setPlayers(null);
        setPlayersObj(null);
        setChores(null);
        setHoliday(null);
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

    const ref = database.ref(`users/${user.uid}`);
    const onUserChange = result => {
      const userData = result.val();
      if (userData && userData.gameId) {
        // If we've just created a game, set to loading while we create the rest of the data
        setIsLoading(true);
        setGame(userData.gameId);
      } else {
        setGame(false);
        setIsLoading(false);
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
      const val = result.val() || {};
      setPlayersObj(val);
      setPlayers(makePlayersArray(val));
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
      playersObj,
      chores,
    }),
    [chores, game, holiday, players, playersObj, user],
  );

  if (isLoading) {
    return <Loading />;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useUserProfile = () => useContext(GameContext).user;
export const useUserId = () => useContext(GameContext).user.uid;
export const useGame = () => useContext(GameContext).game;
export const useHoliday = () => useContext(GameContext).holiday;
export const usePlayers = () => useContext(GameContext).players;
export const usePlayersObj = () => useContext(GameContext).playersObj;
export const useChores = () => useContext(GameContext).chores;
