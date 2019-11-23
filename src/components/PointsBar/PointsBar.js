import React from 'react';
import { MAX_POINT_DIFFERENCE } from 'constants/constants';
import ProgressBar from 'components/ProgressBar';
import classes from './PointsBar.module.css';

const PointsBar = ({ points, minPoints, mid }) => {
  const negativeWidth = Math.min(
    -Math.min((200 * (points - mid)) / MAX_POINT_DIFFERENCE, 0),
    100,
  );
  const positiveWidth = Math.min(
    Math.max((200 * (points - mid)) / MAX_POINT_DIFFERENCE, 0),
    100,
  );
  return (
    <div className={classes.pointsBar}>
      <ProgressBar
        percentage={negativeWidth}
        label={negativeWidth > 0 && `${points - minPoints}`}
        reverse
        appearance="attention"
      />
      <ProgressBar
        percentage={positiveWidth}
        label={
          (positiveWidth > 0 || positiveWidth === negativeWidth) &&
          `${points - minPoints}`
        }
        appearance={positiveWidth === 100 ? 'winning' : 'attention'}
      />
    </div>
  );
};

export default PointsBar;
