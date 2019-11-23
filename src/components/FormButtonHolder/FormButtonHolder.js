import React from 'react';
import classes from './FormButtonHolder.module.css';

const FormButtonHolder = ({ children }) => (
  <div className={classes.wrapper}>{children}</div>
);

export default FormButtonHolder;
