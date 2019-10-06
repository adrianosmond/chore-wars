import React from 'react';
import classNames from 'classnames';
import classes from './Spacer.module.css';

const Spacer = ({
  children,
  as: Element = 'div',
  spacing = 's',
  grow = false,
  className,
  ...props
}) => (
  <Element
    className={classNames({
      [classes[`spacing-${spacing}`]]: true,
      [classes.grow]: grow,
      className,
    })}
    {...props}
  >
    {children}
  </Element>
);

export default Spacer;
