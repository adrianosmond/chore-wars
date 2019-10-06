import React from 'react';
import { format } from 'date-fns';
import Typography from 'components/Typography';
import ActivityLog from 'components/ActivityLog';
import classes from './CompletionLog.module.css';

const CompletionLog = ({ date, name, points }) => (
  <ActivityLog
    date={date}
    description={
      <>
        <span className={classes.highlight}>{name}</span> completed this chore
        at <span className={classes.highlight}>{format(date, 'HH:mm')}</span>
      </>
    }
    extra={
      <>
        <Typography appearance="h2" as="span" className={classes.numPoints}>
          {points}
        </Typography>
        <Typography appearance="h3" as="span" className={classes.pts}>
          <abbr title="points">pts</abbr>
        </Typography>
      </>
    }
  />
);

export default CompletionLog;
