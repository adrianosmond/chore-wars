import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth } from 'database';
import Loading from 'components/Loading';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    return auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser.uid);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
