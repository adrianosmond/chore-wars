import React from 'react';
import Spacer from 'components/Spacer';
import classes from './Input.module.css';

const Input = ({
  type = 'text',
  value,
  onChange,
  label,
  spacing = 'xs',
  ...props
}) => (
  <Spacer spacing={spacing}>
    {label && <label className={classes.label}>{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      {...props}
      className={classes.input}
    />
  </Spacer>
);

export default Input;
