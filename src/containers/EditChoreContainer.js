import React, { useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ChoreFormProvider } from 'contexts/choreForm';
import routes from 'constants/routes';
import useChore from 'hooks/useChore';
import useAsyncMessages from 'hooks/useAsyncMessages';
import ChoreFormContainer from 'containers/ChoreFormContainer';
import InfoPanel from 'components/InfoPanel';
import { SprayIcon } from 'components/Icon';
import Button from 'components/Button';

const EditChoreContainer = () => {
  const history = useHistory();
  const { id } = useParams();
  const [chore, updateChore] = useChore(id);

  const [isBusy, setIsBusy] = useState(false);
  const { Messages, showErrorMessage } = useAsyncMessages();

  const onComplete = useCallback(
    (newChore) => {
      setIsBusy(true);
      updateChore(newChore)
        .then(() => history.push(routes.HOME))
        .catch(() => {
          setIsBusy(false);
          showErrorMessage();
        });
    },
    [updateChore, history, showErrorMessage],
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
    <ChoreFormProvider chore={chore}>
      <Messages />
      <ChoreFormContainer
        title="Edit Chore"
        onComplete={onComplete}
        isBusy={isBusy}
      />
    </ChoreFormProvider>
  );
};

export default EditChoreContainer;
