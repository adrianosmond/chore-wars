import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { useGame, useUserId } from 'contexts/game';
import { ChoreFormProvider } from 'contexts/choreForm';
import { createChore } from 'database/chores';
import routes from 'constants/routes';

import ChoreFormContainer from 'containers/ChoreFormContainer';

const NewChoreContainer = () => {
  const game = useGame();
  const user = useUserId();
  const history = useHistory();
  const onComplete = useCallback(
    chore => {
      createChore(game, user, chore).then(() => history.push(routes.HOME));
    },
    [game, user, history],
  );

  return (
    <ChoreFormProvider>
      <ChoreFormContainer title="New Chore" onComplete={onComplete} />
    </ChoreFormProvider>
  );
};

export default NewChoreContainer;
