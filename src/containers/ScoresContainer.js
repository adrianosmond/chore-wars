import React from 'react';
import { usePlayers } from 'contexts/game';
import Scores from 'components/Scores';
import { getMinPoints, getMaxPoints } from 'utils/players';

const ScoresContainer = () => {
  const players = usePlayers();
  if (players.length < 2) return null;
  const minPoints = getMinPoints(players);
  const maxPoints = getMaxPoints(players);
  return (
    <Scores players={players} minPoints={minPoints} maxPoints={maxPoints} />
  );
};

export default ScoresContainer;
