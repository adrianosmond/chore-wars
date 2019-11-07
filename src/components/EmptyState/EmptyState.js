import React from 'react';
import Spacer from 'components/Spacer';
import Typography from 'components/Typography';
import { SprayIcon } from 'components/Icon';
import classes from './EmptyState.module.css';

const EmptyState = ({ Icon = SprayIcon, title, description, cta }) => (
  <div className={classes.wrapper}>
    <Icon className={classes.icon} />
    <Spacer spacing="m">
      <Typography appearance="h2" as="h2">
        {title}
      </Typography>
      {description && <Typography>{description}</Typography>}
      {cta}
    </Spacer>
  </div>
);

export default EmptyState;
