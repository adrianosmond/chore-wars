import React from 'react';
import { connect } from 'react-redux';

import Players from 'components/Players';
import Scores from 'components/Scores';

import { makePlayersArray } from 'constants/utils';

import './GameHeader.css';

const GameHeader = ({ points }) => {
  const playersArray = makePlayersArray(points);
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
  points: state.points.present,
});

export default connect(mapStateToProps)(GameHeader);
