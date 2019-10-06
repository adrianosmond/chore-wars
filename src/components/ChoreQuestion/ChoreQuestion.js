import React from 'react';
import classes from './ChoreQuestion.module.css';

const ChoreQuestion = ({ question, children }) => (
  <>
    {question && <div className={classes.question}>{question}</div>}
    {children}
  </>
);

export default ChoreQuestion;
