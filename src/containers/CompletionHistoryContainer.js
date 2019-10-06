import React from 'react';
import { usePlayersObj } from 'contexts/game';
import UnstyledList from 'components/UnstyledList';
import CompletionLog from 'components/CompletionLog';

const CompletionHistoryContainer = ({ history }) => {
  const players = usePlayersObj();
  if (history.length === 0) {
    return <p>This chore hasn't been done yet.</p>;
  }
  return (
    <UnstyledList spacing="s">
      {history.map(item => (
        <UnstyledList.Item key={item.key}>
          <CompletionLog
            date={item.date}
            name={players[item.playerId].name}
            points={item.points}
          />
        </UnstyledList.Item>
      ))}
    </UnstyledList>
  );
};

export default CompletionHistoryContainer;
