import React, { useState, useCallback, useMemo } from 'react';
import { usePlayersObj } from 'contexts/game';
import UnstyledList from 'components/UnstyledList';
import CompletionLog from 'components/CompletionLog';
import LinkButton from 'components/LinkButton';

const CompletionHistoryContainer = ({
  history,
  highlightChoreName,
  highlightPlayerName,
}) => {
  const players = usePlayersObj();
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = useCallback(() => {
    setShowAll(state => !state);
  }, []);
  const last5 = useMemo(() => history.slice(0, 5), [history]);
  const toShow = showAll ? history : last5;
  const needsShowMore = last5.length !== history.length;

  return (
    <UnstyledList spacing="s">
      {toShow.map(item => (
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
      {needsShowMore && (
        <UnstyledList.Item>
          <LinkButton onClick={toggleShowAll}>
            {showAll ? 'Show less' : 'Show more'}
          </LinkButton>
        </UnstyledList.Item>
      )}
    </UnstyledList>
  );
};

export default CompletionHistoryContainer;
