import React from 'react';
import classNames from 'classnames';
import classes from './ProgressBar.module.css';

const ProgressBar = ({
  percentage,
  reverse = false,
  label = false,
  color = 'var(--color-warning)',
}) => (
  <div
    className={classNames({
      [classes.outer]: true,
      [classes.reverse]: reverse,
    })}
  >
    <div
      className={classes.inner}
      style={{
        width: `${percentage}%`,
        backgroundColor: color,
        borderTopColor: color,
      }}
    >
      {label ? <div className={classes.label}>{label}</div> : '&nbsp;'}
    </div>
  </div>
);

export default ProgressBar;
