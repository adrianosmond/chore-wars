import React from 'react';
import classes from './IconButton.module.css';

const IconButton = ({ Icon, ...props }) => (
  <button className={classes.button} {...props}>
    <Icon className={classes.icon} />
  </button>
);

export default IconButton;
