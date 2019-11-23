import React from 'react';
import { format } from 'date-fns';
import ActivityLog from 'components/ActivityLog';
import DiffTable from 'components/DiffTable';
import classes from './EditLog.module.css';

const EditLog = ({ date, name, previous, current }) => (
  <>
    <ActivityLog
      date={date}
      description={
        <>
          <span className={classes.highlight}>{name}</span> edited this chore at{' '}
          <span className={classes.highlight}>{format(date, 'HH:mm')}</span>
        </>
      }
      footer={<DiffTable previous={previous} current={current} />}
    />
  </>
);

// <DiffTable current={edit} previous={edit.previous} />

export default EditLog;
