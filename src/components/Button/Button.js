import React from 'react';
import classNames from 'classnames';
import classes from './Button.module.css';

const Button = ({
  type = 'button',
  onClick,
  disabled,
  appearance = 'primary',
  className,
  children,
  ...otherProps
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={classNames({
      [classes.button]: true,
      [classes[appearance]]: true,
      [className]: className,
    })}
    {...otherProps}
  >
    {children}
  </button>
);

export default Button;
