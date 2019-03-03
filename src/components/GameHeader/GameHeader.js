import React from 'react';

import Players from 'components/Players';
import Scores from 'components/Scores';

import { makePlayersArray } from 'constants/utils';

import './GameHeader.css';

const GameHeader = ({ players, points, gameId }) => {
  const playersArray = makePlayersArray(players);
  return (
    <div className="game-header">
      <h1 className="game-header__title">Chore Wars</h1>
      <div className="game-header__players">
        <Players players={playersArray} points={points} gameId={gameId} />
      </div>
      <div className="game-header__scores">
        <Scores points={points} gameId={gameId} />
      </div>
    </div>
  );
};

export default GameHeader;
