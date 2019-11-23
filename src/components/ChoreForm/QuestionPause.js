import React from 'react';
import { useChoreForm } from 'contexts/choreForm';

import ChoreQuestion from 'components/ChoreQuestion';
import Radio from 'components/Radio';

const QuestionPause = () => {
  const { canBePaused, setCanBePaused } = useChoreForm();

  return (
    <ChoreQuestion question="Should this chore pause when you go on holiday?">
      <Radio
        name="affected-by-holiday"
        value="yes"
        checked={canBePaused}
        onChange={() => setCanBePaused(true)}
        label="Yes"
      />
      <Radio
        name="affected-by-holiday"
        value="no"
        checked={!canBePaused}
        onChange={() => setCanBePaused(false)}
        label="No"
      />
    </ChoreQuestion>
  );
};

export default QuestionPause;
