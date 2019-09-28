import React, { useCallback } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { completeChore } from 'database/chores';
import { useUser, useGame, useChores } from 'contexts/game';
import Chore from 'components/Chore';
import UnstyledList from 'components/UnstyledList';
import { sortByCurrentPoints, choreIsAvailable } from 'utils/chores';
import { onAppear, onExit } from 'utils/animations';
import useRerender from 'hooks/useRerender';

const ChoresContainer = () => {
  const rerenderAfter10s = useRerender(10000);
  const user = useUser();
  const game = useGame();
  const chores = useChores()
    .filter(choreIsAvailable)
    .sort(sortByCurrentPoints);

  const markChoreComplete = useCallback(
    (chore, points) => {
      completeChore(game, user, chore, points);
    },
    [game, user],
  );

  return (
    <UnstyledList spacing="s">
      <Flipper flipKey={chores}>
        {chores.map(chore => (
          <Flipped
            key={chore.id}
            flipId={chore.id}
            onAppear={onAppear}
            onExit={onExit}
          >
            <UnstyledList.Item>
              <Chore
                completeChore={() => {
                  markChoreComplete(chore, chore.currentPoints);
                  rerenderAfter10s();
                }}
                {...chore}
              />
            </UnstyledList.Item>
          </Flipped>
        ))}
      </Flipper>
    </UnstyledList>
  );
};

export default ChoresContainer;
