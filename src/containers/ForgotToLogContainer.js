import React, { useCallback, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { completeChore } from 'database/chores';
import { useGame, useUserId } from 'contexts/game';
import { ChoreFormProvider } from 'contexts/choreForm';
import useChore from 'hooks/useChore';
import useAsyncMessages from 'hooks/useAsyncMessages';
import routes from 'constants/routes';
import { computedChoreProperties } from 'utils/chores';
import ChoreFormContainer from 'containers/ChoreFormContainer';
import QuestionLastDone from 'components/ChoreForm/QuestionLastDone';
import QuestionCompletedBy from 'components/ChoreForm/QuestionCompletedBy';
import InfoPanel from 'components/InfoPanel';
import { SprayIcon } from 'components/Icon';
import Button from 'components/Button';

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

  if (!chore) {
    return (
      <InfoPanel
        Icon={SprayIcon}
        title="Which chore?"
        description="Hmm. Not sure what's happened here. If there was ever a chore here, it's gone now. Maybe you cleaned up it?"
        cta={
          <Button onClick={() => history.push(routes.HOME)}>
            Go back to the chores
          </Button>
        }
      />
    );
  }

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
