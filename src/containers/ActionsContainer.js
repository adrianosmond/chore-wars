import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import routes from 'constants/routes';
import { auth } from 'database';
import { startHoliday } from 'database/game';
import { useGame } from 'contexts/game';
import Card from 'components/Card';
import LinkButton from 'components/LinkButton';
import UnstyledList from 'components/UnstyledList';

const ActionsContainer = () => {
  const game = useGame();
  const logout = useCallback(() => auth.signOut(), []);
  const holiday = useCallback(() => startHoliday(game), [game]);
  return (
    <Card title="Actions">
      <UnstyledList spacing="xs">
        <UnstyledList.Item>
          <Link to={routes.NEW_CHORE}>Create a new chore</Link>
        </UnstyledList.Item>
        <UnstyledList.Item>
          <Link to={routes.MANAGE_CHAINS}>Manage chains</Link>
        </UnstyledList.Item>
        <UnstyledList.Item>
          <LinkButton onClick={holiday}>We're on holiday</LinkButton>
        </UnstyledList.Item>
        <UnstyledList.Item>
          <LinkButton onClick={logout}>Logout</LinkButton>
        </UnstyledList.Item>
      </UnstyledList>
    </Card>
  );
};

export default ActionsContainer;
