import React from 'react';
import { format } from 'date-fns';
import { DATE_FORMAT } from 'constants/constants';
import { usePlayersObj } from 'contexts/game';
import UnstyledList from 'components/UnstyledList';
import Typography from 'components/Typography';

const CompletionHistoryContainer = ({ history }) => {
  const players = usePlayersObj();
  if (history.length === 0) {
    return <p>This chore hasn't been done yet.</p>;
  }
  return (
    <UnstyledList spacing="s">
      {history.map(item => (
        <UnstyledList.Item key={item.key}>
          <Typography appearance="h4">
            {format(item.date, DATE_FORMAT)}
          </Typography>
          <p>
            {players[item.playerId].name} completed this chore for {item.points}{' '}
            points.
          </p>
        </UnstyledList.Item>
      ))}
    </UnstyledList>
  );
};

export default CompletionHistoryContainer;
