import React from 'react';
import { Link } from 'react-router-dom';
import { createPlayerProfileLink } from 'constants/routes';
import PointsBar from 'components/PointsBar';
import Typography from 'components/Typography';
import Avatar from 'components/Avatar';
import classes from './PlayerRow.module.css';

const PlayerRow = ({ id, name, points, minPoints, mid, avatar }) => (
  <tr className={classes.playerRow}>
    <td className={classes.nameCell}>
      <Link to={createPlayerProfileLink(id)} className={classes.link}>
        <div className={classes.avatar}>
          <Avatar url={avatar} />
        </div>
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
