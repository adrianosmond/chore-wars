import React, { useEffect } from 'react';
import { format, parse } from 'date-fns';
import { useChoreForm } from 'contexts/choreForm';

import ChoreQuestion from 'components/ChoreQuestion';
import Input from 'components/Input';

const QuestionLastDone = ({ includeTime = false }) => {
  const { lastDone, updateLastDone, setHasError } = useChoreForm();

  useEffect(() => {
    const date = parse(lastDone).getTime();
    setHasError(
      typeof date !== 'number' || date < 0 || date > new Date().getTime(),
    );
  }, [lastDone, setHasError]);

  return (
    <ChoreQuestion>
      <Input
        type={includeTime ? 'datetime-local' : 'date'}
        label="When was this chore last done?"
        value={format(
          lastDone,
          includeTime ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD',
        )}
        max={format(new Date(), 'YYYY-MM-DD')}
        onChange={updateLastDone}
      />
    </ChoreQuestion>
  );
};

export default QuestionLastDone;