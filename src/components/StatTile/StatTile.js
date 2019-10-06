import React from 'react';
import Typography from 'components/Typography';
import classes from './StatTile.module.css';

const StatTile = ({ title, stat, statDetail, footer }) => (
  <>
    <Typography appearance="h4">{title}</Typography>
    <div className={classes.statWrapper}>
      <span className={classes.stat}>{stat}</span>
      <span className={classes.statDetail}>{statDetail}</span>
    </div>
    <p>{footer}</p>
  </>
);

export default StatTile;
