import React from 'react';
import classes from './Label.module.css';

const Label = ({ children }) => (
  <label className={classes.label}>{children}</label>
);

export default Label;
