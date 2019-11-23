import React from 'react';
import { format } from 'date-fns';
import Typography from 'components/Typography';
import classes from './ActivityLog.module.css';

const ActivityLog = ({ date, description, extra, footer }) => (
  <div className={classes.wrapper}>
    <div className={classes.primary}>
      <div className={classes.date}>
        <Typography appearance="h3" as="span" className={classes.month}>
          {format(date, 'MMM')}
        </Typography>
        <Typography appearance="h2" as="span" className={classes.day}>
          {format(date, 'dd')}
        </Typography>
      </div>
      <p className={classes.description}>{description}</p>
      {extra && <div className={classes.extra}>{extra}</div>}
    </div>
    {footer}
  </div>
);

export default ActivityLog;
