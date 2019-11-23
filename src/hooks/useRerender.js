import { useEffect, useState, useCallback } from 'react';

export default (refreshTime = 0) => {
  let refreshTimeout = null;
  useEffect(() => () => clearTimeout(refreshTimeout), [refreshTimeout]);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  return () => {
    refreshTimeout = setTimeout(forceUpdate, refreshTime);
  };
};
