import React from 'react';
import Card from 'components/Card';
import Button from 'components/Button';
import classes from './ChoreForm.module.css';

const ChoreForm = ({
  onSubmit,
  onCancel,
  prevQuestion,
  nextQuestion,
  children,
  hasError,
}) => {
  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <Card>
        <div className={classes.question}>{children}</div>
        <div className={classes.buttons}>
          {prevQuestion && (
            <Button onClick={prevQuestion} appearance="secondary">
              Previous
            </Button>
          )}

          {!prevQuestion && (
            <Button onClick={onCancel} appearance="secondary">
              Cancel
            </Button>
          )}

          {nextQuestion && (
            <Button onClick={nextQuestion} disabled={hasError}>
              Next
            </Button>
          )}

          {!nextQuestion && (
            <Button type="submit" disabled={hasError}>
              Done
            </Button>
          )}
        </div>
      </Card>
    </form>
  );
};

export default ChoreForm;
