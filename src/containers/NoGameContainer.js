import React, { useState, useCallback } from 'react';

import { createGame, joinGame } from 'database/game';
import { MAX_NAME_LENGTH, JOIN_CODE_LENGTH } from 'constants/constants';
import { useUserId } from 'contexts/game';

import Button from 'components/Button';
import Input from 'components/Input';
import Card from 'components/Card';
import Flexer from 'components/Flexer';
import Spacer from 'components/Spacer';
import FormButtonHolder from 'components/FormButtonHolder';
import Typography from 'components/Typography';

const NoGameContainer = () => {
  const user = useUserId();
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
      <Typography as="h1" appearance="h1">
        Welcome to Chore Wars!
      </Typography>
      <Typography appearance="body">
        Firstly, please tell us your first name, or whatever you want to be
        called in the game.
      </Typography>
      <Input
        placeholder="e.g. Sarah"
        value={playerName}
        onChange={updatePlayerName}
        maxLength={MAX_NAME_LENGTH}
      />
      <Flexer>
        <Card>
          <Spacer grow>
            <Typography as="h2" appearance="h2">
              Join a game
            </Typography>
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
            <Typography as="h2" appearance="h2">
              Create a game
            </Typography>
            <Typography>
              Alternatively, if you want create a new game and invite someone
              else...
            </Typography>
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
