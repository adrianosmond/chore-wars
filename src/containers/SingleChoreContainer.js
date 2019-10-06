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
import { getFrequencyDescription } from 'utils/chores';
import CompletionHistoryContainer from 'containers/CompletionHistoryContainer';
import EditHistoryContainer from 'containers/EditHistoryContainer';
import LinkButton from 'components/LinkButton';
import UnstyledList from 'components/UnstyledList';
import Card from 'components/Card';
import Typography from 'components/Typography';
import CompletionStats from 'components/CompletionStats';
import { EditIcon, LateIcon, DeleteIcon } from 'components/Icon';

export default ({ id }) => {
  const [chore] = useChore(id);
  const {
    completions,
    completionRatio,
    timeDifferences,
    edits,
    loading,
  } = useChoreDetails(id);
  return (
    <>
      <Typography as="h1" appearance="h1">
        {chore.name}
      </Typography>
      <UnstyledList spacing="s">
        <UnstyledList.Item>
          Worth {chore.pointsPerTime} points{' '}
          {getFrequencyDescription(chore.frequency)}
        </UnstyledList.Item>
        <UnstyledList.Item>
          <CompletionStats
            completionRatio={completionRatio}
            timeDifferences={timeDifferences}
          />
        </UnstyledList.Item>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <UnstyledList.Item>
              <Card title="Completions">
                <CompletionHistoryContainer history={completions} />
              </Card>
            </UnstyledList.Item>
            {edits.length > 0 && (
              <UnstyledList.Item>
                <Card title="Edits">
                  <EditHistoryContainer history={edits} />
                </Card>
              </UnstyledList.Item>
            )}
          </>
        )}
      </UnstyledList>
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
