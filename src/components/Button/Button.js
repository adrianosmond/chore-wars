import React from 'react';
import classnames from 'classnames';
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
    className={classnames({
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
