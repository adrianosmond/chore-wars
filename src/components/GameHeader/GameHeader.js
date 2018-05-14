import React from 'react';
import { connect } from 'react-redux';

import Players from 'components/Players';
import Scores from 'components/Scores';

import { makePlayersArray } from 'constants/utils';

import './GameHeader.css';

const GameHeader = ({ players }) => {
  const playersArray = makePlayersArray(players);
  return (
    <div className="game-header">
      <h1 className="game-header__title">Chore Wars</h1>
      <div className="game-header__players">
        <Players players={playersArray} />
      </div>
      <div className="game-header__scores">
        <Scores />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  players: state.players,
});

export default connect(mapStateToProps)(GameHeader);
