import React from 'react';
import Label from 'components/Label';
import Spacer from 'components/Spacer';

const ChoreQuestion = ({ question, children }) => (
  <Spacer spacing="xs">
    {question && <Label>{question}</Label>}
    {children}
  </Spacer>
);

export default ChoreQuestion;
