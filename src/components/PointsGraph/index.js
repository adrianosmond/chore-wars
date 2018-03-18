import React from 'react';
import Avatar from 'avataaars';
import Confetti from 'react-dom-confetti';

import { connect } from 'react-redux';

import { claimPrize } from '../../actions/pointActions';

import { MAX_POINT_DIFFERENCE } from '../../constants/constants';
import './index.css';

const PointsGraph = (props) => {
  const { points } = props;
  const players = Object.keys(props.points);
  const minPoints = Math.min(points[players[0]].points, points[players[1]].points);
  const scoresTied = points[players[0]].points === points[players[1]].points;
  return (
    <div className="points-graph">
      <h1 className="points-graph__title">Chore Wars</h1>
      <div className="points-graph__people">
        {players.map((playerId, idx) => {
          const player = points[playerId];
          return (
            <div className={`points-graph__person points-graph__person--${idx + 1}`} key={playerId}>
              <div className="points-graph__person-picture">
                <Avatar style={{ width: '100%', height: '100%', display: 'block' }} { ...player.avatar } />
                { player.isOwed > 0 ?
                <span className="points-graph__person-owed" role="img" aria-labelledby={`${player.name} is owed`}>🌟</span>
                : null}
              </div>
              <div className="points-graph__person-name">{player.name}</div>
            </div>
          );
        })}
      </div>
      <div className="points-graph__graph">
        {players.map((playerId, idx) => {
          const player = points[playerId];
          const playerBar = (player.points - minPoints);
          const winning = playerBar >= MAX_POINT_DIFFERENCE;
          return (
            <div className={`points-graph__bar points-graph__bar--${idx + 1}${winning ? ' points-graph__bar--winning' : ''}`}
              style={{ width: `${Math.min(50, (playerBar / MAX_POINT_DIFFERENCE) * 50)}%` }}
              key={playerId}>
              { playerBar || scoresTied ?
              <div className={`points-graph__difference points-graph__difference--${idx + 1}${winning ? ' points-graph__difference--winning' : ''}`}
                onClick={winning ? () => props.claimPrize(playerId, props.gameId) : null}>
                <Confetti active={!winning} />
                {playerBar}
                </div>
              : null }
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  points: state.points.present,
  gameId: state.session.game.gameId,
});

const matchDispatchToProps = dispatch => ({
  claimPrize: (game, player) => dispatch(claimPrize(game, player)),
});

export { PointsGraph };

export default connect(mapStateToProps, matchDispatchToProps)(PointsGraph);
