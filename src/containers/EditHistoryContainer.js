import React from 'react';
import { usePlayersObj } from 'contexts/game';
import UnstyledList from 'components/UnstyledList';
import EditLog from 'components/EditLog';

const EditHistoryContainer = ({ history }) => {
  const players = usePlayersObj();
  return (
    <UnstyledList spacing="s">
      {history.map(edit => (
        <UnstyledList.Item key={edit.key}>
          <EditLog
            date={edit.date}
            name={players[edit.playerId].name}
            previous={edit.previous}
            current={edit}
          />
        </UnstyledList.Item>
      ))}
    </UnstyledList>
  );
};

export default EditHistoryContainer;
