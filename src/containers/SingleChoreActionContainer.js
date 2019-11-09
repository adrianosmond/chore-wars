import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { deleteChore } from 'database/chores';
import routes, {
  createEditChoreLink,
  createForgotToLogLink,
} from 'constants/routes';
import { useGame } from 'contexts/game';
import LinkButton from 'components/LinkButton';
import UnstyledList from 'components/UnstyledList';
import Card from 'components/Card';
import Typography from 'components/Typography';
import { EditIcon, LateIcon, DeleteIcon } from 'components/Icon';
import { ConfirmModal } from 'components/Modal';

const SingleChoreActionContainer = ({ id }) => {
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

export default SingleChoreActionContainer;
