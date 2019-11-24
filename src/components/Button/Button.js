import React from 'react';
import classnames from 'classnames';
import { SpinnerIcon } from 'components/Icon';
import classes from './Button.module.css';

const Button = ({
  type = 'button',
  onClick,
  disabled,
  appearance = 'primary',
  className,
  children,
  isBusy = false,
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
      [classes.isBusy]: isBusy,
    })}
    {...otherProps}
  >
    {children}
    {isBusy && <SpinnerIcon className={classes.busyIcon} />}
  </button>
);

export default Button;
