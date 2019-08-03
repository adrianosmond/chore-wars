import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { deleteChore } from 'database/chores';
import { createEditChoreLink, createForgotToLogLink } from 'constants/routes';
import LinkButton from 'components/LinkButton';
import useChore from 'hooks/useChore';
import { useGame } from 'contexts/game';
import UnstyledList from 'components/UnstyledList';
import Card from 'components/Card';
import Typography from 'components/Typography';

const SingleChoreContainer = ({ id }) => {
  const [chore] = useChore(id);
  return (
    <>
      <Typography as="h1" appearance="h1">
        {chore.name}
      </Typography>
      Worth {chore.pointsPerTime} points
      {chore.frequency === 0 && <> when it needs to be done</>}
      {chore.frequency === 1 && <> every day</>}
      {chore.frequency > 1 && <> every {chore.frequency} days</>}
    </>
  );
};

const SingleChoreContainerAside = ({ id }) => {
  const game = useGame();
  const removeChore = useCallback(() => {
    deleteChore(game, id);
  }, [game, id]);
  return (
    <Card title="Actions">
      <UnstyledList spacing="xs">
        <UnstyledList.Item>
          <Link to={createEditChoreLink(id)}>Edit</Link>{' '}
        </UnstyledList.Item>
        <UnstyledList.Item>
          <Link to={createForgotToLogLink(id)}>Forgot to log</Link>{' '}
        </UnstyledList.Item>
        <UnstyledList.Item>
          <LinkButton onClick={removeChore}>Delete</LinkButton>
        </UnstyledList.Item>
      </UnstyledList>
    </Card>
  );
};

export default SingleChoreContainer;

export { SingleChoreContainerAside };
