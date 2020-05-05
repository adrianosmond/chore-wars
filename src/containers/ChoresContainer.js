import React, { useCallback } from 'react';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { useHistory } from 'react-router-dom';
import { completeChore } from 'database/chores';
import { useUserId, useGame, useChores } from 'contexts/game';
import useRerender from 'hooks/useRerender';
import { sortByCurrentPoints, choreIsAvailable } from 'utils/chores';
import { onAppear, onExit } from 'utils/animations';
import routes from 'constants/routes';
import Chore from 'components/Chore';
import UnstyledList from 'components/UnstyledList';
import InfoPanel from 'components/InfoPanel';
import Button from 'components/Button';
import { SprayIcon } from 'components/Icon';

const ChoresContainer = () => {
  const rerenderAfter10s = useRerender(10000);
  const user = useUserId();
  const game = useGame();
  const chores = useChores().filter(choreIsAvailable).sort(sortByCurrentPoints);

  const markChoreComplete = useCallback(
    (chore, points) => {
      completeChore(game, user, chore, points);
    },
    [game, user],
  );

  const history = useHistory();

  if (chores.length === 0) {
    return (
      <InfoPanel
        Icon={SprayIcon}
        title="Nothing to see here"
        description="You don't have any chores yet. Once you do, they will show up here. Why not go ahead and create one now?"
        cta={
          <Button onClick={() => history.push(routes.NEW_CHORE)}>
            Create a chore
          </Button>
        }
      />
    );
  }

  return (
    <UnstyledList spacing="s">
      <Flipper flipKey={chores}>
        {chores.map((chore) => (
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
