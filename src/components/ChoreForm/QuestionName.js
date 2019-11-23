import React, { useEffect } from 'react';
import { useChoreForm } from 'contexts/choreForm';
import ChoreQuestion from 'components/ChoreQuestion';
import Input from 'components/Input';

const QuestionName = () => {
  const { name, updateName, setHasError } = useChoreForm();

  useEffect(() => {
    setHasError(name.trim().length === 0);
  }, [name, setHasError]);

  return (
    <ChoreQuestion>
      <Input
        label="What is the name of this chore?"
        placeholder="e.g. Wash dishes"
        value={name}
        onChange={updateName}
      />
    </ChoreQuestion>
  );
};

export default QuestionName;
