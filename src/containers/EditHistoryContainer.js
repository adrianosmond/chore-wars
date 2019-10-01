import React from 'react';
import { format } from 'date-fns';
import { DATE_FORMAT } from 'constants/constants';
import { usePlayersObj } from 'contexts/game';
import { getFrequencyDescription } from 'utils/chores';
import UnstyledList from 'components/UnstyledList';
import Typography from 'components/Typography';

const DiffTable = ({ current, previous }) => {
  return (
    <table>
      <tbody>
        {current.name !== previous.name ? (
          <tr>
            <th>Name</th>
            <td>{previous.name}</td>
            <td>{current.name}</td>
          </tr>
        ) : null}
        {current.pointsPerTime !== previous.pointsPerTime ? (
          <tr>
            <th>Points</th>
            <td>{previous.pointsPerTime}</td>
            <td>{current.pointsPerTime}</td>
          </tr>
        ) : null}
        {current.frequency !== previous.frequency ? (
          <tr>
            <th>Frequency</th>
            <td>{getFrequencyDescription(previous.frequency)}</td>
            <td>{getFrequencyDescription(current.frequency)}</td>
          </tr>
        ) : null}
        {current.lastDone !== previous.lastDone ? (
          <tr>
            <th>Last done</th>
            <td>{format(previous.lastDone, DATE_FORMAT)}</td>
            <td>{format(current.lastDone, DATE_FORMAT)}</td>
          </tr>
        ) : null}
        {current.timePaused !== previous.timePaused ? (
          <tr>
            <th>Pause for holiday</th>
            <td>{typeof previous.timePaused !== 'undefined' ? 'Yes' : 'No'}</td>
            <td>{typeof current.timePaused !== 'undefined' ? 'Yes' : 'No'}</td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};

const EditHistoryContainer = ({ history }) => {
  const players = usePlayersObj();
  return (
    <UnstyledList spacing="s">
      {history.map(edit => (
        <UnstyledList.Item key={edit.key}>
          <Typography appearance="h4">
            {format(edit.date, DATE_FORMAT)}
          </Typography>
          <p>{players[edit.playerId].name} edited this chore</p>
          <DiffTable current={edit} previous={edit.previous} />
        </UnstyledList.Item>
      ))}
    </UnstyledList>
  );
};

export default EditHistoryContainer;
