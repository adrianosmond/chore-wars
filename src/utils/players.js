export const makePlayersArray = players =>
  Object.keys(players).map(player => ({
    ...players[player],
    id: player,
  }));

export const generatePlayerData = (playerName, points = 0) => {
  const data = {
    name: playerName,
    points,
    isOwed: 0,
  };
  return data;
};

export const getMinPoints = players => Math.min(...players.map(p => p.points));

export const getMaxPoints = players => Math.max(...players.map(p => p.points));
