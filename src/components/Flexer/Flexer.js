import React from 'react';
import classes from './Flexer.module.css';

const Flexer = ({ children, breakpoint = '45rem' }) => (
  <div
    className={classes.wrapper}
    style={{ '--flexer-breakpoint': breakpoint }}
  >
    {children}
  </div>
);

export default Flexer;
