export const makePlayersArray = players =>
  Object.keys(players).map(player => ({
    ...players[player],
    id: player,
  }));

export const generateNewPlayerData = (name, points = 0) => ({
  name,
  points,
});

export const getMinPoints = players => Math.min(...players.map(p => p.points));

export const getMaxPoints = players => Math.max(...players.map(p => p.points));
