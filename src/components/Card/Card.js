import React from 'react';
import classnames from 'classnames';
import Typography from 'components/Typography';
import classes from './Card.module.css';

const Card = ({ children, appearance = 'normal', title }) => (
  <div
    className={classnames({
      [classes.card]: true,
      [classes[appearance]]: true,
    })}
  >
    {title && (
      <Typography appearance="h3" className={classes.title}>
        {title}
      </Typography>
    )}
    {children}
  </div>
);

export default Card;
