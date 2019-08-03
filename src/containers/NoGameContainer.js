import React, { useState, useCallback } from 'react';

import { createGame, joinGame } from 'database/game';
import { MAX_NAME_LENGTH, JOIN_CODE_LENGTH } from 'constants/constants';
import { useUser } from 'contexts/user';

import Button from 'components/Button';
import Input from 'components/Input';

const NoGameContainer = () => {
  const user = useUser();
  const [playerName, setPlayerName] = useState('');
  const [gameToJoin, setGameToJoin] = useState('');
  const updatePlayerName = useCallback(
    event => setPlayerName(event.target.value),
    [],
  );
  const updateGameToJoin = useCallback(
    event => setGameToJoin(event.target.value),
    [],
  );

  return (
    <div>
      <h1>Welcome to Chore Wars!</h1>
      <p>
        Firstly, please tell us your first name, or whatever you want to be
        called in the game.
      </p>
      <Input
        placeholder="e.g. Sarah"
        value={playerName}
        onChange={updatePlayerName}
        maxLength={MAX_NAME_LENGTH}
      />

      <h2>Join a game</h2>
      <p>
        If you have been given a code to join someone else&#39;s game, you can
        enter it here:
      </p>
      <Input
        placeholder="e.g. abcdwxyz"
        value={gameToJoin}
        onChange={updateGameToJoin}
        maxLength={JOIN_CODE_LENGTH}
      />
      <Button
        onClick={() => joinGame(user, gameToJoin, playerName)}
        disabled={playerName.trim().length === 0 || gameToJoin.length !== 8}
      >
        Join game
      </Button>

      <h2>Create a game</h2>
      <p>
        Alternatively, if you want create a new game and invite someone else...
      </p>
      <Button
        variant="secondary"
        onClick={() => createGame(user, playerName)}
        disabled={
          playerName.trim().length === 0 || gameToJoin.trim().length > 0
        }
      >
        Create a game
      </Button>
    </div>
  );
};

export default NoGameContainer;
