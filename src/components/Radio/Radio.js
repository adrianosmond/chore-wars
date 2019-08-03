import React from 'react';
import classes from './Radio.module.css';

const Radio = ({ name = null, value, onChange, checked = false, label }) => (
  <label className={classes.wrapper}>
    <input
      name={name}
      type="radio"
      value={value}
      onChange={onChange}
      checked={checked}
      className={classes.radio}
    />
    {label && <span className={classes.label}>{label}</span>}
  </label>
);

export default Radio;
