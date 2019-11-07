import React, { useEffect, useState, useCallback } from 'react';
import { database } from 'database';
import { lockGame } from 'database/game';
import { useGame, usePlayers } from 'contexts/game';
import Card from 'components/Card';
import Typography from 'components/Typography';
import EmptyState from 'components/EmptyState';
import LinkButton from 'components/LinkButton';

const AddPlayersContainer = () => {
  const game = useGame();
  const players = usePlayers();
  const [joinCode, setJoinCode] = useState(null);

  useEffect(() => {
    database.ref(`games/${game}/gameIncomplete`).once('value', result => {
      if (result.val()) {
        database
          .ref(`joinCodes`)
          .orderByValue()
          .equalTo(game)
          .once('value', code => setJoinCode(Object.keys(code.val())[0]));
      }
    });
  }, [game]);

  const lockTheGame = useCallback(() => lockGame(game, joinCode), [
    game,
    joinCode,
  ]);

  if (!joinCode) return null;

  return (
    <Card appearance="info">
      <EmptyState
        size="s"
        title="Want to add players?"
        description={
          <>
            If you want people to split the chores with you and join your game,
            give them the code: <strong>{joinCode}</strong>.{' '}
            {players.length > 1 && (
              <>
                Once everyone has joined, you can{' '}
                <LinkButton onClick={lockTheGame}>lock the game</LinkButton> and
                this message will go away
              </>
            )}
          </>
        }
      />
    </Card>
  );
};

export default AddPlayersContainer;
