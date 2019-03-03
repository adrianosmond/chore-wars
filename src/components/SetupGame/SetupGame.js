import React, { useState } from 'react';

import { MAX_NAME_LENGTH, JOIN_CODE_LENGTH } from 'constants/constants';

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
      <input
        type="text"
        placeholder="e.g. Sarah"
        className="form__input"
        value={playerName}
        onChange={event => setPlayerName(event.target.value)}
        maxLength={MAX_NAME_LENGTH}
      />

      <h2>Join a game</h2>
      <p>
        If you have been given a code to join someone else&#39;s game, you can enter it here:
      </p>
      <input
        type="text"
        placeholder="e.g. abcdwxyz"
        className="form__input"
        value={gameToJoin}
        onChange={event => setGameToJoin(event.target.value)}
        maxLength={JOIN_CODE_LENGTH}
      />
      <button
        type="button"
        onClick={() => doJoinGame(user, gameToJoin, playerName)}
        disabled={playerName.trim().length === 0 || gameToJoin.length !== 8}
        className="form__button"
      >
        Join game
      </button>

      <h2>Create a game</h2>
      <p>Alternatively, if you want create a new game and invite someone else...</p>
      <button
        type="button"
        onClick={() => doCreateGame(user, playerName)}
        disabled={playerName.trim().length === 0 || gameToJoin.trim().length > 0}
        className="form__button form__button--secondary"
      >
        Create a game
      </button>
    </div>
  );
};

export default SetupGame;
