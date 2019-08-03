import React from 'react';
import ProgressBar from 'components/ProgressBar';
import { MAX_POINT_DIFFERENCE } from 'constants/constants';
import classes from './TwoPlayerScorecard.module.css';

const getPercentage = points => (100 * points) / MAX_POINT_DIFFERENCE;

const TwoPlayerScorecard = ({ players: [player1, player2], minPoints }) => {
  const player1Pct =
    player1.points === minPoints
      ? 0
      : getPercentage(player1.points - minPoints);

  let player1Label =
    player1.points > minPoints ? player1.points - minPoints : null;
  if (player1.points === player2.points) {
    player1Label = '0';
  }
  const player2Label =
    player2.points > minPoints ? player2.points - minPoints : null;

  const player2Pct =
    player2.points === minPoints
      ? 0
      : getPercentage(player2.points - minPoints);
  return (
    <>
      <div className={classes.bar}>
        <ProgressBar percentage={player1Pct} label={player1Label} reverse />
        <ProgressBar percentage={player2Pct} label={player2Label} />
      </div>
      <div className={classes.players}>
        <p>{player1.name}</p>
        <p>{player2.name}</p>
      </div>
    </>
  );
};

export default TwoPlayerScorecard;