import React from 'react';
import classnames from 'classnames';
import classes from './ProgressBar.module.css';

const ProgressBar = ({
  percentage,
  reverse = false,
  label = false,
  color = 'var(--color-warning)',
}) => (
  <div
    className={classnames({
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
      {label || label === 0 ? (
        <div className={classes.label}>{label}</div>
      ) : (
        '&nbsp;'
      )}
    </div>
  </div>
);

export default ProgressBar;
