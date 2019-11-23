import React from 'react';
import classnames from 'classnames';
import classes from './Typography.module.css';

const Typography = ({
  as: Element = 'p',
  appearance = 'body',
  children,
  className,
  ...props
}) => (
  <Element
    className={classnames({
      [classes[appearance]]: true,
      [className]: className,
    })}
    {...props}
  >
    {children}
  </Element>
);

export default Typography;
