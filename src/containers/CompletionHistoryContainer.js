import React from 'react';
import { usePlayersObj } from 'contexts/game';
import UnstyledList from 'components/UnstyledList';
import CompletionLog from 'components/CompletionLog';

const CompletionHistoryContainer = ({
  history,
  highlightChoreName,
  highlightPlayerName,
}) => {
  const players = usePlayersObj();

  return (
    <UnstyledList spacing="s">
      {history.map(item => (
        <UnstyledList.Item key={item.key}>
          <CompletionLog
            date={item.date}
            playerName={players[item.playerId].name}
            highlightPlayerName={highlightPlayerName}
            points={item.points}
            choreName={highlightChoreName ? item.name : 'this chore'}
            highlightChoreName={highlightChoreName}
          />
        </UnstyledList.Item>
      ))}
    </UnstyledList>
  );
};

export default CompletionHistoryContainer;
