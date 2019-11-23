import React, { useCallback, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useGame, useUserId } from 'contexts/game';
import { ChoreFormProvider } from 'contexts/choreForm';
import routes from 'constants/routes';
import useChore from 'hooks/useChore';
import { completeChore } from 'database/chores';

import ChoreFormContainer from 'containers/ChoreFormContainer';
import QuestionLastDone from 'components/ChoreForm/QuestionLastDone';
import { computedChoreProperties } from 'utils/chores';

const ForgotToLogContainer = () => {
  const game = useGame();
  const user = useUserId();
  const history = useHistory();
  const { id } = useParams();
  const [chore] = useChore(id);
  const modifiedChore = useMemo(
    () => ({
      ...chore,
      lastDone: new Date().getTime(),
    }),
    [chore],
  );
  const onComplete = useCallback(
    newChore => {
      const { currentPoints } = computedChoreProperties(
        chore,
        newChore.lastDone,
      );
      return completeChore(
        game,
        user,
        chore,
        currentPoints,
        newChore.lastDone,
      ).then(() => history.push(routes.HOME));
    },
    [chore, game, user, history],
  );

  if (!chore) history.replace(routes.HOME);

  return (
    <ChoreFormProvider chore={modifiedChore}>
      <ChoreFormContainer
        title="Forgot to log"
        questions={[<QuestionLastDone includeTime key="lastDone" />]}
        onComplete={onComplete}
      />
    </ChoreFormProvider>
  );
};

export default ForgotToLogContainer;
