import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useGame, useUserId } from 'contexts/game';
import { ChoreFormProvider } from 'contexts/choreForm';
import { createChore } from 'database/chores';
import routes from 'constants/routes';
import useAsyncMessages from 'hooks/useAsyncMessages';

import ChoreFormContainer from 'containers/ChoreFormContainer';

const NewChoreContainer = () => {
  const game = useGame();
  const user = useUserId();
  const history = useHistory();
  const [isBusy, setIsBusy] = useState(false);
  const { Messages, showErrorMessage } = useAsyncMessages();

  const onComplete = useCallback(
    chore => {
      setIsBusy(true);
      createChore(game, user, chore)
        .then(() => history.push(routes.HOME))
        .catch(() => {
          setIsBusy(false);
          showErrorMessage();
        });
    },
    [game, user, history, showErrorMessage],
  );

  return (
    <ChoreFormProvider>
      <Messages />
      <ChoreFormContainer
        title="New Chore"
        onComplete={onComplete}
        isBusy={isBusy}
      />
    </ChoreFormProvider>
  );
};

export default NewChoreContainer;
