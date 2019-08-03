import React, { useCallback } from 'react';
import { completeChore } from 'database/chores';
import { useUser, useGame, useChores } from 'contexts/game';
import Chore from 'components/Chore';
import UnstyledList from 'components/UnstyledList';

const ChoresContainer = () => {
  const user = useUser();
  const game = useGame();
  const chores = useChores().filter(
    chore => !chore.isWaiting && new Date().getTime() - chore.lastDone >= 60000,
  );

  const markChoreComplete = useCallback(
    (chore, points) => {
      completeChore(game, user, chore, points);
    },
    [game, user],
  );

  return (
    <UnstyledList spacing="s">
      {chores.map(chore => (
        <UnstyledList.Item key={chore.id}>
          <Chore
            completeChore={() => markChoreComplete(chore, chore.currentPoints)}
            {...chore}
          />
        </UnstyledList.Item>
      ))}
    </UnstyledList>
  );
};

export default ChoresContainer;
