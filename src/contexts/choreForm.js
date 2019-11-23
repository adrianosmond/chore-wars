import React, { useState, useCallback, useContext, createContext } from 'react';
import { toDate, parseISO } from 'date-fns';

const ChoreFormContext = createContext();

const defaultChore = {
  name: '',
  frequency: 7,
  pointsPerTime: 20,
  lastDone: new Date().getTime(),
  canBePaused: false,
};

export const ChoreFormProvider = ({ children, chore = defaultChore }) => {
  const [name, setName] = useState(chore.name);
  const [frequency, setFrequency] = useState(chore.frequency);
  const [pointsPerTime, setPointsPerTime] = useState(chore.pointsPerTime);
  const [lastDone, setLastDone] = useState(chore.lastDone);
  const [canBePaused, setCanBePaused] = useState(
    typeof chore.timePaused === 'number',
  );

  const [hasError, setHasError] = useState(false);

  const updateName = useCallback(e => setName(e.target.value), []);
  const updateFrequency = useCallback(e => setFrequency(e.target.value), []);
  const updatePointsPerTime = useCallback(
    e => setPointsPerTime(e.target.value),
    [],
  );
  const updateLastDone = useCallback(e => {
    const { value } = e.target;
    if (value && value !== '') {
      setLastDone(parseISO(e.target.value).getTime());
    }
  }, []);

  const getState = useCallback(
    () => ({
      name,
      frequency: parseInt(frequency, 10) || 0,
      pointsPerTime: parseInt(pointsPerTime, 10),
      timePaused: canBePaused ? 0 : null,
      lastDone: toDate(lastDone).getTime(),
    }),
    [canBePaused, frequency, lastDone, name, pointsPerTime],
  );

  const value = {
    name,
    updateName,
    frequency,
    updateFrequency,
    pointsPerTime,
    updatePointsPerTime,
    lastDone,
    updateLastDone,
    canBePaused,
    setCanBePaused,
    hasError,
    setHasError,
    getState,
  };

  return (
    <ChoreFormContext.Provider value={value}>
      {children}
    </ChoreFormContext.Provider>
  );
};

export const useChoreForm = () => useContext(ChoreFormContext);
