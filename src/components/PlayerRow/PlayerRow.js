import React from 'react';
import { Link } from 'react-router-dom';
import { createPlayerProfileLink } from 'constants/routes';
import PointsBar from 'components/PointsBar';
import Typography from 'components/Typography';
import { Avatar } from 'components/Icon';
import classes from './PlayerRow.module.css';

const PlayerRow = ({ id, name, points, minPoints, mid }) => (
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
      <PointsBar points={points} minPoints={minPoints} mid={mid} />
    </td>
  </tr>
);

export default React.memo(PlayerRow);
