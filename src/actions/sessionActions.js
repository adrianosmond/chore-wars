export function setAuthUser(authUser) {
  return {
    type: 'SET_AUTH_USER',
    authUser,
  };
}

export function setGame(game) {
  return {
    type: 'SET_GAME',
    game,
  };
}

export function setPointsLoaded(pointsLoaded) {
  return {
    type: 'SET_POINTS_LOADED',
    pointsLoaded,
  };
}

export function setChoresLoaded(choresLoaded) {
  return {
    type: 'SET_CHORES_LOADED',
    choresLoaded,
  };
}
