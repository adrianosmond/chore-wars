import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteChore } from 'database/chores';
import routes, {
  createEditChoreLink,
  createForgotToLogLink,
} from 'constants/routes';
import useChore from 'hooks/useChore';
import useChoreDetails from 'hooks/useChoreDetails';
import { useGame } from 'contexts/game';
import CompletionHistoryContainer from 'containers/CompletionHistoryContainer';
import EditHistoryContainer from 'containers/EditHistoryContainer';
import CompletionStatsContainer from 'containers/CompletionStatsContainer';
import LinkButton from 'components/LinkButton';
import UnstyledList from 'components/UnstyledList';
import Card from 'components/Card';
import Typography from 'components/Typography';
import Spacer from 'components/Spacer';
import { EditIcon, LateIcon, DeleteIcon } from 'components/Icon';
import Loading from 'components/Loading';

export default ({ id }) => {
  const [chore] = useChore(id);
  const {
    completions,
    completionRatio,
    timeDifferences,
    edits,
    loading,
  } = useChoreDetails(id);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Typography as="h1" appearance="h1">
        {chore.name}
      </Typography>
      <Spacer>
        {timeDifferences.length > 0 && (
          <CompletionStatsContainer
            completionRatio={completionRatio}
            timeDifferences={timeDifferences}
            frequency={chore.frequency}
          />
        )}
        <Card title="Recent completions">
          <CompletionHistoryContainer history={completions} />
        </Card>
        {edits.length > 0 && (
          <Card title="Edits">
            <EditHistoryContainer history={edits} />
          </Card>
        )}
      </Spacer>
    </>
  );
};

export const SingleChoreContainerAside = ({ id }) => {
  const game = useGame();
  const history = useHistory();
  const deleteChoreAndRedirect = useCallback(() => {
    history.push(routes.HOME);
    deleteChore(game, id);
  }, [game, history, id]);
  return (
    <Card title="Actions">
      <UnstyledList spacing="xs">
        <UnstyledList.Item>
          <LinkButton to={createEditChoreLink(id)} Icon={EditIcon}>
            Edit
          </LinkButton>{' '}
        </UnstyledList.Item>
        <UnstyledList.Item>
          <LinkButton to={createForgotToLogLink(id)} Icon={LateIcon}>
            Forgot to log
          </LinkButton>{' '}
        </UnstyledList.Item>
        <UnstyledList.Item>
          <LinkButton onClick={deleteChoreAndRedirect} Icon={DeleteIcon}>
            Delete
          </LinkButton>
        </UnstyledList.Item>
      </UnstyledList>
    </Card>
  );
};
