import React, { useState, useCallback, useEffect } from 'react';
import { useChoreForm } from 'contexts/choreForm';
import { MIN_CHORE_FREQUENCY, MAX_CHORE_FREQUENCY } from 'constants/constants';

import ChoreQuestion from 'components/ChoreQuestion';
import Input from 'components/Input';
import Radio from 'components/Radio';

import classes from './Question.module.css';

const isFrequencyInvalid = frequency =>
  Number.isNaN(frequency) ||
  typeof frequency !== 'number' ||
  frequency < MIN_CHORE_FREQUENCY ||
  frequency > MAX_CHORE_FREQUENCY;

const QuestionFrequency = () => {
  const { frequency, updateFrequency, setHasError } = useChoreForm();
  const [hasFrequency, setHasFrequency] = useState(frequency !== 0);
  const frequencyOn = useCallback(() => {
    setHasFrequency(true);
  }, []);
  const frequencyOff = useCallback(() => {
    setHasFrequency(false);
  }, []);

  useEffect(() => {
    const freq = parseInt(frequency, 10);
    setHasError(hasFrequency && isFrequencyInvalid(freq));
  }, [frequency, hasFrequency, setHasError]);

  return (
    <ChoreQuestion question="How often do you need to do this chore?">
      <Radio
        name="frequency-type"
        value="with-regularity"
        checked={hasFrequency}
        onChange={frequencyOn}
        label={
          <div className={classes.radioLabelWrapper}>
            <span>Every </span>
            <Input
              type="number"
              pattern="[0-9]*"
              min={MIN_CHORE_FREQUENCY}
              max={MAX_CHORE_FREQUENCY}
              maxLength={MAX_CHORE_FREQUENCY.toString().length}
              value={frequency}
              onChange={updateFrequency}
              onClick={frequencyOn}
            />
            <span>days</span>
          </div>
        }
      />
      <Radio
        name="frequency-type"
        value="as-and-when"
        checked={!hasFrequency}
        onChange={frequencyOff}
        label="Whenever it needs doing"
      />
    </ChoreQuestion>
  );
};

export default QuestionFrequency;
