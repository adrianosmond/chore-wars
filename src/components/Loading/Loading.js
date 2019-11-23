import React from 'react';
import Typography from 'components/Typography';
import classes from './Loading.module.css';
import loading1 from './loading1.png';
import loading2 from './loading2.png';

const Loading = () => (
  <div className={classes.outer}>
    <div className={classes.inner}>
      <img src={loading1} alt="" className={classes.image} />
      <img
        src={loading2}
        alt=""
        className={`${classes.image} ${classes.image2}`}
      />
    </div>
    <Typography as="h1" appearance="h1">
      Loading
    </Typography>
  </div>
);

export default Loading;
