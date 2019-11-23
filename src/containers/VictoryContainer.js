import React, { useCallback } from 'react';
import { MAX_POINT_DIFFERENCE } from 'constants/constants';
import InfoPanel from 'components/InfoPanel';
import Button from 'components/Button';
import Card from 'components/Card';
import { ConfettiIcon } from 'components/Icon';
import { usePlayers, usePlayersObj, useUserId, useGame } from 'contexts/game';
import { claimVictory } from 'database/players';

const VictoryContainer = () => {
  const game = useGame();
  const userId = useUserId();
  const currentPoints = usePlayersObj()[userId].points;
  const players = usePlayers();
  const victories = players.filter(
    p => p.points + MAX_POINT_DIFFERENCE < currentPoints,
  );

  const victory = useCallback(
    versusId => claimVictory(game, versusId, userId),
    [game, userId],
  );

  return (
    <>
      {victories.map(player => (
        <Card key={player.id} appearance="info">
          <InfoPanel
            Icon={ConfettiIcon}
            size="xs"
            title={`You beat ${player.name}`}
            description={`Because you have more than ${MAX_POINT_DIFFERENCE} more points than ${player.name},
              you can claim a victory. In exchange for ${MAX_POINT_DIFFERENCE} points, you'll be owed
              whatever the forfeit for losing is.`}
            cta={
              <Button onClick={() => victory(player.id)}>
                Claim your victory
              </Button>
            }
          />
        </Card>
      ))}
    </>
  );
};

export default VictoryContainer;
