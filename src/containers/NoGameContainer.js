import React, { useState, useCallback } from 'react';

import { createGame, joinGame } from 'database/game';
import { MAX_NAME_LENGTH, JOIN_CODE_LENGTH } from 'constants/constants';
import { useUser } from 'contexts/game';

import Button from 'components/Button';
import Input from 'components/Input';
import Card from 'components/Card';
import Flexer from 'components/Flexer';
import Spacer from 'components/Spacer';
import FormButtonHolder from 'components/FormButtonHolder';

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
    <Spacer>
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
      <Flexer>
        <Card>
          <Spacer grow>
            <h2>Join a game</h2>
            <Input
              label="If you have been given a code to join someone else&#39;s game, you can enter it here:"
              placeholder="e.g. abcdwxyz"
              value={gameToJoin}
              onChange={updateGameToJoin}
              maxLength={JOIN_CODE_LENGTH}
            />
            <FormButtonHolder>
              <Button
                onClick={() => joinGame(user, gameToJoin, playerName)}
                disabled={
                  playerName.trim().length === 0 || gameToJoin.length !== 8
                }
              >
                Join game
              </Button>
            </FormButtonHolder>
          </Spacer>
        </Card>
        <Card>
          <Spacer grow>
            <h2>Create a game</h2>
            <p>
              Alternatively, if you want create a new game and invite someone
              else...
            </p>
            <FormButtonHolder>
              <Button
                variant="secondary"
                onClick={() => createGame(user, playerName)}
                disabled={
                  playerName.trim().length === 0 || gameToJoin.trim().length > 0
                }
              >
                Create a game
              </Button>
            </FormButtonHolder>
          </Spacer>
        </Card>
      </Flexer>
    </Spacer>
  );
};

export default NoGameContainer;
