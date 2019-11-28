import React from 'react';
import Card from 'components/Card';
import Button from 'components/Button';
import Typography from 'components/Typography';
import classes from './ChoreForm.module.css';

const ChoreForm = ({
  onSubmit,
  onCancel,
  prevQuestion,
  nextQuestion,
  children,
  hasError,
  isBusy,
  title,
}) => {
  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <Typography appearance="h1">{title}</Typography>
      <Card appearance="medium">
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
            <Button type="submit" disabled={hasError} isBusy={isBusy}>
              Done
            </Button>
          )}
        </div>
      </Card>
    </form>
  );
};

export default ChoreForm;
