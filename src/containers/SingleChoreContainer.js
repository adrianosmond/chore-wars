import React, { useCallback, useState } from 'react';
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
import { EditIcon, LateIcon, DeleteIcon, ClothIcon } from 'components/Icon';
import Loading from 'components/Loading';
import InfoPanel from 'components/InfoPanel';
import { ConfirmModal } from 'components/Modal';

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
        {completions.length > 1 ? (
          <Card title="Recent completions">
            <CompletionHistoryContainer history={completions} />
          </Card>
        ) : (
          <InfoPanel
            Icon={ClothIcon}
            title="No completions yet"
            description="It looks like this chore has never been completed. When you have done it, you'll be able to see stats about it here."
          />
        )}
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const openDeleteModal = useCallback(() => setShowDeleteModal(true), []);
  const closeDeleteModal = useCallback(() => setShowDeleteModal(false), []);

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
          <LinkButton onClick={openDeleteModal} Icon={DeleteIcon}>
            Delete
          </LinkButton>
        </UnstyledList.Item>
      </UnstyledList>
      {showDeleteModal && (
        <ConfirmModal
          isDelete={true}
          closeModal={closeDeleteModal}
          onConfirm={deleteChoreAndRedirect}
          confirmText="Yes, delete it"
        >
          <Typography>
            Are you sure you want to delete this chore? It and all of its
            history will be gone forever.
          </Typography>
        </ConfirmModal>
      )}
    </Card>
  );
};
