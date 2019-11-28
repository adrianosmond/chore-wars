import React, { useCallback, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { useGame, useUserId } from 'contexts/game';
import { ChoreFormProvider } from 'contexts/choreForm';
import routes from 'constants/routes';
import useChore from 'hooks/useChore';
import { completeChore } from 'database/chores';
import useAsyncMessages from 'hooks/useAsyncMessages';

import ChoreFormContainer from 'containers/ChoreFormContainer';
import QuestionLastDone from 'components/ChoreForm/QuestionLastDone';
import QuestionCompletedBy from 'components/ChoreForm/QuestionCompletedBy';
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

  const [isBusy, setIsBusy] = useState(false);
  const { Messages, showErrorMessage } = useAsyncMessages();

  const [completer, setCompleter] = useState(user);
  const updateCompleter = ({ value }) => setCompleter(value);

  const onComplete = useCallback(
    ({ lastDone }) => {
      const { currentPoints: points } = computedChoreProperties(
        chore,
        lastDone,
      );

      setIsBusy(true);

      return completeChore(game, completer, chore, points, lastDone)
        .then(() => history.push(routes.HOME))
        .catch(() => {
          setIsBusy(false);
          showErrorMessage();
        });
    },
    [chore, game, completer, history, showErrorMessage],
  );

  if (!chore) history.replace(routes.HOME);

  return (
    <ChoreFormProvider chore={modifiedChore}>
      <Messages />
      <ChoreFormContainer
        title="Forgot to log"
        questions={[
          <QuestionCompletedBy
            currentPlayer={completer}
            onChange={updateCompleter}
            key="completedBy"
          />,
          <QuestionLastDone includeTime key="lastDone" />,
        ]}
        isBusy={isBusy}
        onComplete={onComplete}
      />
    </ChoreFormProvider>
  );
};

export default ForgotToLogContainer;
