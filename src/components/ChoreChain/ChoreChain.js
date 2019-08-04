import React, { useCallback } from 'react';
import Select from 'react-select';
import Card from 'components/Card';
import LinkButton from 'components/LinkButton';
import classes from './ChoreChain.module.css';

const PLACEHOLDER = 'Please select a chore to add';

const ChoreChain = ({
  chores,
  availableChores,
  chainId,
  addChoreToChain,
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
      <div className={classes.chain}>
        {chores.map(chore => (
          <div key={chore.id} className={classes.chore}>
            {chore.name}{' '}
            <LinkButton onClick={() => handleRemove(chore.id)}>
              &times;
            </LinkButton>
          </div>
        ))}
      </div>
      <div className={classes.remove}>
        <LinkButton onClick={handleRemoveChain}>Remove</LinkButton>
      </div>
    </Card>
  );
};
export default ChoreChain;
