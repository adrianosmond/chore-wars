import React, { useState, useCallback } from 'react';
import { useChoreForm } from 'contexts/choreForm';
import ChoreForm from 'components/ChoreForm';
import QuestionName from 'components/ChoreForm/QuestionName';
import QuestionFrequency from 'components/ChoreForm/QuestionFrequency';
import QuestionPoints from 'components/ChoreForm/QuestionPoints';
import QuestionPause from 'components/ChoreForm/QuestionPause';
import QuestionLastDone from 'components/ChoreForm/QuestionLastDone';

const defaultQuestions = [
  <QuestionName key="name" />,
  <QuestionFrequency key="frequency" />,
  <QuestionPoints key="points" />,
  <QuestionPause key="canPause" />,
  <QuestionLastDone key="lastDone" />,
];

const ChoreFormContainer = ({ questions = defaultQuestions, onComplete }) => {
  const { hasError, getState } = useChoreForm();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const prevQuestion = useCallback(() => setCurrentQuestion(q => q - 1), []);
  const nextQuestion = useCallback(
    e => {
      e.preventDefault();
      if (!hasError) {
        setCurrentQuestion(q => q + 1);
      }
    },
    [hasError],
  );

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      onComplete(getState());
    },
    [getState, onComplete],
  );

  const onCancel = useCallback(() => window.history.back(), []);

  return (
    <ChoreForm
      onSubmit={
        currentQuestion === questions.length - 1 ? onSubmit : nextQuestion
      }
      onCancel={onCancel}
      prevQuestion={currentQuestion > 0 && prevQuestion}
      nextQuestion={currentQuestion < questions.length - 1 && nextQuestion}
      hasError={hasError}
    >
      {questions.filter((q, i) => i === currentQuestion)}
    </ChoreForm>
  );
};

export default ChoreFormContainer;
