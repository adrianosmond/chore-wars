import React from 'react';
import classnames from 'classnames';
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
    className={classnames({
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
