import React from 'react';
import classes from './LinkButton.module.css';

const LinkButton = ({ onClick, children }) => (
  <button onClick={onClick} className={classes.linkButton}>
    {children}
  </button>
);

export default LinkButton;
