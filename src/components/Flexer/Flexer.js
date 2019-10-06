import React from 'react';
import classes from './Flexer.module.css';

const Flexer = ({ children }) => (
  <div className={classes.wrapper}>{children}</div>
);

export default Flexer;
