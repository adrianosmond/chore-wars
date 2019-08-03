import React, { useCallback } from 'react';
import { withRouter } from 'react-router-dom';

import { ChoreFormProvider } from 'contexts/choreForm';
import routes from 'constants/routes';
import useChore from 'hooks/useChore';

import ChoreFormContainer from 'containers/ChoreFormContainer';

const EditChoreContainer = ({
  history,
  match: {
    params: { id },
  },
}) => {
  const [chore, updateChore] = useChore(id);
  const onComplete = useCallback(
    newChore => updateChore(newChore).then(() => history.push(routes.CHORES)),
    [updateChore, history],
  );

  if (!chore) history.replace(routes.CHORES);

  return (
    <ChoreFormProvider chore={chore}>
      <ChoreFormContainer onComplete={onComplete} />
    </ChoreFormProvider>
  );
};

export default withRouter(EditChoreContainer);
