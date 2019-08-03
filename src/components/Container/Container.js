import React from 'react';
import classes from './Container.module.css';

const Container = ({ children }) => (
  <div className={classes.container}>{children}</div>
);

export default Container;
