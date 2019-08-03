import React from 'react';
import classnames from 'classnames';
import classes from './Typography.module.css';

const Typography = ({
  as: Element = 'div',
  appearance = 'body',
  children,
  className,
  ...props
}) => (
  <Element
    className={classnames({ [classes[appearance]]: true, [className]: true })}
    {...props}
  >
    {children}
  </Element>
);

export default Typography;
