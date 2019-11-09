import React from 'react';
import { format } from 'date-fns';
import Typography from 'components/Typography';
import ActivityLog from 'components/ActivityLog';
import classes from './CompletionLog.module.css';

const conditionalHighlight = (text, condition) =>
  condition ? <span className={classes.highlight}>{text}</span> : text;

const CompletionLog = ({
  date,
  playerName,
  highlightPlayerName = false,
  points,
  choreName,
  highlightChoreName = false,
}) => (
  <ActivityLog
    date={date}
    description={
      <>
        {conditionalHighlight(playerName, highlightPlayerName)} completed{' '}
        {conditionalHighlight(choreName, highlightChoreName)} at{' '}
        {conditionalHighlight(format(date, 'HH:mm'), true)}
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
