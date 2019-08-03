import React from 'react';
import classNames from 'classnames';
import Typography from 'components/Typography';
import classes from './Card.module.css';

const Card = ({ children, appearance = 'normal', spaced = false, title }) => (
  <div
    className={classNames({
      [classes.card]: true,
      [classes.spaced]: spaced,
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
