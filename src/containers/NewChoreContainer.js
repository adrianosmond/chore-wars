import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import { useUser } from 'contexts/user';
import { useGame } from 'contexts/game';
import { ChoreFormProvider } from 'contexts/choreForm';
import { createChore } from 'database/chores';
import routes from 'constants/routes';

import ChoreFormContainer from 'containers/ChoreFormContainer';

const NewChoreContainer = ({ history }) => {
  const game = useGame();
  const user = useUser();
  const onComplete = useCallback(
    chore => {
      createChore(game, user, chore).then(() => history.push(routes.CHORES));
    },
    [game, user, history],
  );

  return (
    <ChoreFormProvider>
      <ChoreFormContainer onComplete={onComplete} />
    </ChoreFormProvider>
  );
};

export default withRouter(NewChoreContainer);
