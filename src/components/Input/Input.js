import React from 'react';
import Spacer from 'components/Spacer';
import Label from 'components/Label';
import classes from './Input.module.css';

const Input = ({ type = 'text', value, onChange, label, ...props }) => (
  <Spacer spacing="xs">
    {label && <Label>{label}</Label>}
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
