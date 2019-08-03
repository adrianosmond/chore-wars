import React, { useEffect } from 'react';
import { useChoreForm } from 'contexts/choreForm';
import { MIN_CHORE_POINTS, MAX_CHORE_POINTS } from 'constants/constants';

import ChoreQuestion from 'components/ChoreQuestion';
import Input from 'components/Input';

const isPointsInvalid = points =>
  Number.isNaN(points) ||
  typeof points !== 'number' ||
  points < MIN_CHORE_POINTS ||
  points > MAX_CHORE_POINTS;

const QuestionPoints = () => {
  const { pointsPerTime, updatePointsPerTime, setHasError } = useChoreForm();

  useEffect(() => {
    const points = parseInt(pointsPerTime, 10);
    setHasError(isPointsInvalid(points));
  }, [pointsPerTime, setHasError]);

  return (
    <ChoreQuestion>
      <Input
        type="number"
        pattern="[0-9]*"
        min={MIN_CHORE_POINTS}
        max={MAX_CHORE_POINTS}
        maxLength={MAX_CHORE_POINTS.toString().length}
        label="How many points should this chore be worth?"
        value={pointsPerTime}
        onChange={updatePointsPerTime}
      />
    </ChoreQuestion>
  );
};

export default QuestionPoints;
