import React from 'react';
import classes from './Input.module.css';

const Input = ({ type = 'text', value, onChange, label, ...props }) => (
  <div>
    {label && <label className={classes.label}>{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      {...props}
      className={classes.input}
    />
  </div>
);

export default Input;
