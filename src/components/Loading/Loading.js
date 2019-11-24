import React from 'react';
import Typography from 'components/Typography';
import { SpinnerIcon } from 'components/Icon';
import classes from './Loading.module.css';

const Loading = ({ showText = true }) => (
  <div className={classes.outer}>
    <SpinnerIcon className={classes.spinner} />
    {showText && <Typography>Loading</Typography>}
  </div>
);

export default Loading;
