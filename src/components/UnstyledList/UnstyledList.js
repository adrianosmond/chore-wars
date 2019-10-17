import React from 'react';
import classnames from 'classnames';
import classes from './UnstyledList.module.css';

const UnstyledList = ({ children, spacing, className, ...props }) => (
  <ul
    className={classnames({
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
  <li className={classnames(classes.item, className)} {...props}>
    {children}
  </li>
);

export default UnstyledList;
