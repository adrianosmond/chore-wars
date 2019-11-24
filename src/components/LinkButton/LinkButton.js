import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { SpinnerIcon } from 'components/Icon';
import classes from './LinkButton.module.css';

const LinkButton = ({
  to,
  onClick,
  Icon,
  children,
  className,
  isBusy = false,
}) => {
  if (to) {
    return (
      <Link
        to={to}
        className={classnames({
          [classes.linkButton]: true,
          [classes.withIcon]: Icon,
          [className]: className,
        })}
      >
        {Icon && <Icon className={classes.icon} fill="currentColor" />}
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className={classnames({
        [classes.linkButton]: true,
        [classes.withIcon]: Icon,
        [className]: className,
      })}
      disabled={isBusy}
    >
      {Icon && !isBusy && <Icon className={classes.icon} fill="currentColor" />}
      {Icon && isBusy && (
        <SpinnerIcon
          className={classnames([classes.icon, classes.spinIcon])}
          fill="currentColor"
        />
      )}
      {children}
    </button>
  );
};

export default LinkButton;
