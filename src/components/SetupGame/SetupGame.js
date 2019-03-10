import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MAX_NAME_LENGTH, JOIN_CODE_LENGTH } from 'constants/constants';

import Button from 'components/Button';
import Input from 'components/Input';

const SetupGame = ({ user, doCreateGame, doJoinGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [gameToJoin, setGameToJoin] = useState('');

  return (
    <div className="form">
      <h1>Welcome to Chore Wars!</h1>
      <p>
        Firstly, please tell us your first name, or whatever you want
        to be called in the game.
      </p>
      <Input
        placeholder="e.g. Sarah"
        value={playerName}
        onChange={event => setPlayerName(event.target.value)}
        maxLength={MAX_NAME_LENGTH}
      />

      <h2>Join a game</h2>
      <p>
        If you have been given a code to join someone else&#39;s game, you can enter it here:
      </p>
      <Input
        placeholder="e.g. abcdwxyz"
        value={gameToJoin}
        onChange={event => setGameToJoin(event.target.value)}
        maxLength={JOIN_CODE_LENGTH}
      />
      <Button
        onClick={() => doJoinGame(user, gameToJoin, playerName)}
        disabled={playerName.trim().length === 0 || gameToJoin.length !== 8}
      >
        Join game
      </Button>

      <h2>Create a game</h2>
      <p>Alternatively, if you want create a new game and invite someone else...</p>
      <Button
        variant="secondary"
        onClick={() => doCreateGame(user, playerName)}
        disabled={playerName.trim().length === 0 || gameToJoin.trim().length > 0}
      >
        Create a game
      </Button>
    </div>
  );
};

SetupGame.propTypes = {
  user: PropTypes.string.isRequired,
  doCreateGame: PropTypes.func.isRequired,
  doJoinGame: PropTypes.func.isRequired,
};

export default SetupGame;
