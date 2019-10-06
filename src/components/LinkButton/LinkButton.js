import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import classes from './LinkButton.module.css';

const LinkButton = ({ to, onClick, Icon, children }) => {
  if (to) {
    return (
      <Link
        to={to}
        className={classNames({
          [classes.linkButton]: true,
          [classes.withIcon]: Icon,
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
      className={classNames({
        [classes.linkButton]: true,
        [classes.withIcon]: Icon,
      })}
    >
      {Icon && <Icon className={classes.icon} fill="currentColor" />}
      {children}
    </button>
  );
};

export default LinkButton;
