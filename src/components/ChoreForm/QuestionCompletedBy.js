import React, { useMemo } from 'react';
import Select from 'react-select';
import { usePlayers } from 'contexts/game';
import ChoreQuestion from 'components/ChoreQuestion';

const QuestionCompletedBy = ({ currentPlayer, onChange }) => {
  const players = usePlayers();

  const playerOptions = useMemo(
    () =>
      players.map((player) => ({
        value: player.id,
        label: player.name,
      })),
    [players],
  );

  const initialValue = playerOptions.find(
    (player) => player.value === currentPlayer,
  );

  return (
    <ChoreQuestion question="Who forgot to log the chore?">
      <Select
        options={playerOptions}
        defaultValue={initialValue}
        onChange={onChange}
      ></Select>
    </ChoreQuestion>
  );
};

export default QuestionCompletedBy;
