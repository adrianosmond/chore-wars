import React from 'react';
import classnames from 'classnames';
import classes from './ProgressBar.module.css';

const ProgressBar = ({
  percentage,
  reverse = false,
  label = false,
  appearance,
}) => (
  <div
    className={classnames({
      [classes.outer]: true,
      [classes.reverse]: reverse,
    })}
  >
    <div
      className={classnames({
        [classes.inner]: true,
        [classes[appearance]]: appearance,
      })}
      style={{ width: `${percentage}%` }}
    >
      {label || label === 0 ? (
        <div className={classes.label}>{label}</div>
      ) : (
        '&nbsp;'
      )}
    </div>
  </div>
);

export default ProgressBar;
