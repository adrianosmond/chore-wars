import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { useChoreForm } from 'contexts/choreForm';

import ChoreQuestion from 'components/ChoreQuestion';
import Input from 'components/Input';

const QuestionLastDone = ({ includeTime = false }) => {
  const { lastDone, updateLastDone, setHasError } = useChoreForm();

  useEffect(() => {
    setHasError(
      typeof lastDone !== 'number' ||
        lastDone < 0 ||
        lastDone > new Date().getTime(),
    );
  }, [lastDone, setHasError]);

  return (
    <ChoreQuestion>
      <Input
        type={includeTime ? 'datetime-local' : 'date'}
        label="When was this chore last done?"
        value={format(
          lastDone,
          includeTime ? "yyyy-MM-dd'T'HH:mm" : 'yyyy-MM-dd',
        )}
        max={format(new Date(), 'yyyy-MM-dd')}
        onChange={updateLastDone}
      />
    </ChoreQuestion>
  );
};

export default QuestionLastDone;
