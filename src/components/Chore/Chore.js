import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { createSingleChoreLink } from 'constants/routes';
import { DATE_FORMAT } from 'constants/constants';
import Card from 'components/Card';
import Button from 'components/Button';
import ProgressBar from 'components/ProgressBar';
import Typography from 'components/Typography';

import classes from './Chore.module.css';

const Chore = ({
  id,
  name,
  currentPoints,
  lastDone,
  frequency,
  due,
  completeChore,
  percentage,
}) => (
  <Card appearance="primary">
    <div className={classes.divider}>
      <div className={classes.left}>
        <Typography appearance="h4">{name}</Typography>
        <div className={classes.progressBar}>
          <ProgressBar
            percentage={percentage}
            label={currentPoints}
            color={
              percentage === 100
                ? 'var(--color-warning)'
                : 'var(--color-primary-dark)'
            }
          />
        </div>
        <p className={classes.date}>
          <Typography appearance="h3" as="span">
            Last Done:
          </Typography>{' '}
          {format(lastDone, DATE_FORMAT)}
        </p>
        {frequency > 0 && (
          <p
            className={classnames({
              [classes.date]: true,
              [classes.overdue]: percentage === 100,
            })}
          >
            <Typography appearance="h3" as="span">
              Due:
            </Typography>{' '}
            {format(due, DATE_FORMAT)}
          </p>
        )}
      </div>
      <div className={classes.right}>
        <Button
          onClick={completeChore}
          className={classes.completeButton}
          appearance="inverse"
        >
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <path
              fill="var(--color-primary-dark)"
              d="M434.8 49L174.2 309.7l-97.4-97.4L0 289.2l174.1 174.1 22.5-22.4 315.1-315.1L434.8 49z"
            />
          </svg>
        </Button>
        <Link to={createSingleChoreLink(id)}>More...</Link>
      </div>
    </div>
  </Card>
);

export default Chore;
