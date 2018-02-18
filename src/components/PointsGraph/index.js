import React from 'react';
import { connect } from 'react-redux';
import { MAX_POINT_DIFFERENCE } from '../../constants/constants';
import './index.css';

const PointsGraph = (props) => {
  const { points } = props;
  const players = Object.keys(props.points);
  const minPoints = Math.min(points[players[0]].points, points[players[1]].points);
  return (
    <div className="points-graph">
      <h1 className="points-graph__title">Chore Wars</h1>
      <div className="points-graph__people">
        {players.map((playerId, idx) => {
          const player = points[playerId];
          return (
            <div className={`points-graph__person points-graph__person--${idx + 1}`} key={playerId}>
              <img src={`/images/avatars/${playerId}.svg`} className="points-graph__person-picture" alt={''} />
              <div className="points-graph__person-name">{player.name}</div>
            </div>
          );
        })}
      </div>
      <div className="points-graph__graph">
        {players.map((playerId, idx) => {
          const player = points[playerId];
          const playerBar = (player.points - minPoints);
          return (
            <div className={`points-graph__bar points-graph__bar--${idx + 1}`} style={{ width: `${Math.min(50, (playerBar / MAX_POINT_DIFFERENCE) * 50)}%` }} key={playerId}>
              { playerBar ? <div className={`points-graph__difference points-graph__difference--${idx + 1}`}>{playerBar}</div> : null }
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  points: state.points.present,
});

export { PointsGraph };

export default connect(mapStateToProps)(PointsGraph);
