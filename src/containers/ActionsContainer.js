import React, { useCallback } from 'react';
import routes from 'constants/routes';
import { startHoliday } from 'database/game';
import { useGame } from 'contexts/game';
import Card from 'components/Card';
import LinkButton from 'components/LinkButton';
import UnstyledList from 'components/UnstyledList';
import { AddIcon, HolidayIcon, LinkIcon } from 'components/Icon';

const ActionsContainer = () => {
  const game = useGame();
  const holiday = useCallback(() => startHoliday(game), [game]);
  return (
    <Card title="Actions">
      <UnstyledList spacing="xs">
        <UnstyledList.Item>
          <LinkButton to={routes.NEW_CHORE} Icon={AddIcon}>
            Create a new chore
          </LinkButton>
        </UnstyledList.Item>
        <UnstyledList.Item>
          <LinkButton to={routes.MANAGE_CHAINS} Icon={LinkIcon}>
            Manage chains
          </LinkButton>
        </UnstyledList.Item>
        <UnstyledList.Item>
          <LinkButton onClick={holiday} Icon={HolidayIcon}>
            Start a holiday
          </LinkButton>
        </UnstyledList.Item>
      </UnstyledList>
    </Card>
  );
};

export default ActionsContainer;
