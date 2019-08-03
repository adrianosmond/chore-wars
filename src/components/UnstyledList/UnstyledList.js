import React from 'react';
import classNames from 'classnames';
import classes from './UnstyledList.module.css';

const UnstyledList = ({ children, spacing, className, ...props }) => (
  <ul
    className={classNames({
      [classes.list]: true,
      [classes[`spacing-${spacing}`]]: spacing,
      className,
    })}
    {...props}
  >
    {children}
  </ul>
);

UnstyledList.Item = ({ children, className, ...props }) => (
  <li className={classNames(classes.item, className)} {...props}>
    {children}
  </li>
);

export default UnstyledList;
