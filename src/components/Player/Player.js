import React from 'react';
import { MAX_POINT_DIFFERENCE } from 'constants/constants';
import ProgressBar from 'components/ProgressBar';
import classes from './Player.module.css';

const PointsBar = ({ points, minPoints, maxPoints }) => {
  const range = maxPoints - minPoints;
  const mid = range / 2;
  const negativeWidth = Math.min(
    -Math.min((200 * (points - mid)) / MAX_POINT_DIFFERENCE, 0),
    100,
  );
  const positiveWidth = Math.min(
    Math.max((200 * (points - mid)) / MAX_POINT_DIFFERENCE, 0),
    100,
  );
  return (
    <div className={classes.pointsBar}>
      <ProgressBar percentage={negativeWidth} reverse />
      <ProgressBar percentage={positiveWidth} />
    </div>
  );
};

const Player = ({ name, points, minPoints, maxPoints }) => (
  <div className={classes.player}>
    <div className={classes.playerName}>{name}</div>
    <PointsBar points={points} minPoints={minPoints} maxPoints={maxPoints} />
  </div>
);

export default React.memo(Player);
