import React from 'react';
import { connect } from 'react-redux';
import Confetti from 'react-dom-confetti';

import { claimPrize } from 'actions/pointActions';

import { MAX_POINT_DIFFERENCE } from 'constants/constants';

import './Scores.css';

const Scores = (props) => {
  const { points } = props;
  const players = Object.keys(props.points);

  const minPoints = players.length === 2 ?
    Math.min(points[players[0]].points, points[players[1]].points) :
    points[players[0]].points;

  const scoresTied = players.length === 2 ?
    points[players[0]].points === points[players[1]].points :
    true;

  return (
    <div className="scores">
      {players.map((playerId, idx) => {
        const player = points[playerId];
        const playerBar = (player.points - minPoints);
        const winning = playerBar >= MAX_POINT_DIFFERENCE;
        return (
          <div className={`scores__bar scores__bar--${idx + 1}${winning ? ' scores__bar--winning' : ''}`}
            style={{ width: `${Math.min(50, (playerBar / MAX_POINT_DIFFERENCE) * 50)}%` }}
            key={playerId}>
            { playerBar || scoresTied ?
            <div className={`scores__difference scores__difference--${idx + 1}${winning ? ' scores__difference--winning' : ''}`}
              onClick={winning ? () => props.claimPrize(playerId, props.gameId) : null}>
              <Confetti active={!winning} />
              {playerBar}
              </div>
            : null }
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  points: state.points.present,
  user: state.session.authUser.uid,
  gameId: state.session.game.gameId,
});

const matchDispatchToProps = dispatch => ({
  claimPrize: (player, game) => dispatch(claimPrize(player, game)),
});

export default connect(mapStateToProps, matchDispatchToProps)(Scores);
