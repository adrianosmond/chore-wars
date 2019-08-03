import React from 'react';
import classes from './ChoreQuestion.module.css';

const ChoreQuestion = ({ question, children }) => (
  <div>
    {question && <div className={classes.question}>{question}</div>}
    {children}
  </div>
);

export default ChoreQuestion;
