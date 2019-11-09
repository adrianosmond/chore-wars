import React from 'react';
import { Link } from 'react-router-dom';
import { MAX_POINT_DIFFERENCE } from 'constants/constants';
import { createPlayerProfileLink } from 'constants/routes';
import ProgressBar from 'components/ProgressBar';
import Typography from 'components/Typography';
import { Avatar } from 'components/Icon';
import classes from './PlayerRow.module.css';

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

const PlayerRow = ({ id, name, points, minPoints, maxPoints }) => (
  <tr className={classes.playerRow}>
    <td className={classes.nameCell}>
      <Link to={createPlayerProfileLink(id)}>
        <Avatar className={classes.avatar} />
        <Typography as="span" className={classes.playerName}>
          {name}
        </Typography>
      </Link>
    </td>
    <td className={classes.pointsCell}>
      <PointsBar
        points={points}
        minPoints={minPoints}
        maxPoints={maxPoints}
        className={classes.pointsBar}
      />
    </td>
  </tr>
);

export default React.memo(PlayerRow);
