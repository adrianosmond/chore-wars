import React from 'react';
import classnames from 'classnames';
import classes from './IconButton.module.css';

const IconButton = ({ Icon, className, ...props }) => (
  <button
    className={classnames({
      [classes.button]: true,
      [className]: true,
    })}
    {...props}
  >
    <Icon className={classes.icon} />
  </button>
);

export default IconButton;
