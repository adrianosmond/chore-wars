import React, { useCallback } from 'react';
import Select from 'react-select';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import Card from 'components/Card';
import LinkButton from 'components/LinkButton';
import ChoreChainChore from './ChoreChainChore';
import classes from './ChoreChain.module.css';

const PLACEHOLDER = 'Select a chore to add';

const ChoreChain = ({
  chores,
  availableChores,
  chainId,
  addChoreToChain,
  reorderChores,
  removeChain,
  removeChoreFromChain,
}) => {
  const handleSelect = useCallback(
    e => {
      addChoreToChain(availableChores.find(c => c.id === e.value), chainId);
    },
    [addChoreToChain, availableChores, chainId],
  );

  const handleRemove = useCallback(
    choreId => {
      removeChoreFromChain(chores.find(c => c.id === choreId), chainId);
    },
    [removeChoreFromChain, chores, chainId],
  );

  const handleRemoveChain = useCallback(() => {
    removeChain(chainId);
  }, [removeChain, chainId]);

  const moveChore = useCallback(
    (dragIndex, hoverIndex) => {
      reorderChores(chainId, dragIndex, hoverIndex);
    },
    [chainId, reorderChores],
  );

  return (
    <Card>
      <div>
        <Select
          options={availableChores.map(chore => ({
            value: chore.id,
            label: chore.name,
          }))}
          onChange={handleSelect}
          value={null}
          placeholder={PLACEHOLDER}
        />
      </div>
      <DndProvider backend={HTML5Backend}>
        <div className={classes.chain}>
          {chores.map((chore, index) => (
            <ChoreChainChore
              key={chore.id}
              chainId={chainId}
              chore={chore}
              index={index}
              moveChore={moveChore}
              removeChore={() => handleRemove(chore.id)}
            />
          ))}
        </div>
      </DndProvider>
      <div className={classes.remove}>
        <LinkButton onClick={handleRemoveChain}>Remove</LinkButton>
      </div>
    </Card>
  );
};
export default ChoreChain;
