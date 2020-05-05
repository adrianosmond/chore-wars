import React from 'react';
import classnames from 'classnames';
import Spacer from 'components/Spacer';
import Typography from 'components/Typography';
import classes from './InfoPanel.module.css';

const headingSize = (size) => {
  if (['xs', 's'].includes(size)) {
    return 'h4';
  }
  return 'h2';
};

const InfoPanel = ({ Icon, title, description, cta, size = 'm' }) => (
  <div
    className={classnames({
      [classes.wrapper]: true,
      [classes[size]]: true,
    })}
  >
    {Icon && <Icon className={classes.icon} />}
    <Spacer spacing={size}>
      <Typography appearance={headingSize(size)} as="h2">
        {title}
      </Typography>
      {description && <Typography>{description}</Typography>}
      {cta}
    </Spacer>
  </div>
);

export default InfoPanel;
