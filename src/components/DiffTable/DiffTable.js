import React from 'react';
import { getFrequencyDescription } from 'utils/chores';
import { DATE_FORMAT } from 'constants/constants';
import { format } from 'date-fns';
import classes from './DiffTable.module.css';

const DiffTable = ({ current, previous }) => (
  <table className={classes.table}>
    <tbody>
      {current.name !== previous.name ? (
        <tr>
          <th>Name</th>
          <td className={classes.previous}>{previous.name}</td>
          <td>{current.name}</td>
        </tr>
      ) : null}
      {current.pointsPerTime !== previous.pointsPerTime ? (
        <tr>
          <th>Points</th>
          <td className={classes.previous}>{previous.pointsPerTime}</td>
          <td>{current.pointsPerTime}</td>
        </tr>
      ) : null}
      {current.frequency !== previous.frequency ? (
        <tr>
          <th>Frequency</th>
          <td className={classes.previous}>
            {getFrequencyDescription(previous.frequency)}
          </td>
          <td>{getFrequencyDescription(current.frequency)}</td>
        </tr>
      ) : null}
      {current.lastDone !== previous.lastDone ? (
        <tr>
          <th>Last done</th>
          <td className={classes.previous}>
            {format(previous.lastDone, DATE_FORMAT)}
          </td>
          <td>{format(current.lastDone, DATE_FORMAT)}</td>
        </tr>
      ) : null}
      {current.timePaused !== previous.timePaused ? (
        <tr>
          <th>Pause for holiday</th>
          <td className={classes.previous}>
            {typeof previous.timePaused !== 'undefined' ? 'Yes' : 'No'}
          </td>
          <td>{typeof current.timePaused !== 'undefined' ? 'Yes' : 'No'}</td>
        </tr>
      ) : null}
    </tbody>
  </table>
);

export default DiffTable;
