import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ChoreFormProvider } from 'contexts/choreForm';
import routes from 'constants/routes';
import useChore from 'hooks/useChore';

import ChoreFormContainer from 'containers/ChoreFormContainer';

const EditChoreContainer = () => {
  const history = useHistory();
  const { id } = useParams();
  const [chore, updateChore] = useChore(id);
  const onComplete = useCallback(
    newChore => updateChore(newChore).then(() => history.push(routes.HOME)),
    [updateChore, history],
  );

  if (!chore) history.replace(routes.HOME);

  return (
    <ChoreFormProvider chore={chore}>
      <ChoreFormContainer title="Edit Chore" onComplete={onComplete} />
    </ChoreFormProvider>
  );
};

export default EditChoreContainer;
