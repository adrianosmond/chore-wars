import React, { useEffect, useState, useCallback } from 'react';
import { database } from 'database';
import { lockGame } from 'database/game';
import { useGame, usePlayers } from 'contexts/game';
import Card from 'components/Card';
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
    <Card appearance="info" spaced>
      <p>
        Want to add players? Give them the code: <strong>{joinCode}</strong>.{' '}
        {players.length > 1 && (
          <>
            Once everyone has joined, click here to{' '}
            <LinkButton onClick={lockTheGame}>lock the game</LinkButton>
          </>
        )}
      </p>
    </Card>
  );
};

export default AddPlayersContainer;
