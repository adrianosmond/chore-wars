import React from 'react';
import { Link } from 'react-router-dom';
import { createPlayerProfileLink } from 'constants/routes';
import ProgressBar from 'components/ProgressBar';
import { MAX_POINT_DIFFERENCE } from 'constants/constants';
import Typography from 'components/Typography';
import Avatar from 'components/Avatar';
import classes from './TwoPlayerScorecard.module.css';

const getPercentage = (points) =>
  Math.min((100 * points) / MAX_POINT_DIFFERENCE, 100);

const getPtsPercentage = (points, minPoints) =>
  points === minPoints ? 0 : getPercentage(points - minPoints);

const getLabel = (points, minPoints) =>
  points > minPoints ? points - minPoints : null;

const getLabelAndPercentage = (points, minPoints) => ({
  label: getLabel(points, minPoints),
  percentage: getPtsPercentage(points, minPoints),
});

const TwoPlayerScorecard = ({ players: [player1, player2], minPoints }) => {
  const { label: player1Label, percentage: player1Pct } = getLabelAndPercentage(
    player1.points,
    minPoints,
  );
  const { label: player2Label, percentage: player2Pct } = getLabelAndPercentage(
    player2.points,
    minPoints,
  );

  return (
    <div className={classes.players}>
      <Link to={createPlayerProfileLink(player1.id)} className={classes.player}>
        <Avatar className={classes.avatar} url={player1.avatar} />
        <Typography className={classes.name}>{player1.name}</Typography>
      </Link>
      <div className={classes.bar}>
        <ProgressBar
          percentage={player1Pct}
          label={player1.points === player2.points ? '0' : player1Label}
          reverse
          appearance={player1Pct === 100 ? 'winning' : 'attention'}
        />
        <ProgressBar
          percentage={player2Pct}
          label={player2Label}
          appearance={player2Pct === 100 ? 'winning' : 'attention'}
        />
      </div>
      <Link to={createPlayerProfileLink(player2.id)} className={classes.player}>
        <Avatar className={classes.avatar} url={player2.avatar} />
        <Typography className={classes.name}>{player2.name}</Typography>
      </Link>
    </div>
  );
};

export default TwoPlayerScorecard;
