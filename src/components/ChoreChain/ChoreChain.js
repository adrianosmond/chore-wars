import React, { useState, useCallback } from 'react';
import Card from 'components/Card';
import classes from './ChoreChain.module.css';
import LinkButton from 'components/LinkButton';

const PLACEHOLDER = 'Please select a chore to add';

const ChoreChain = ({
  chores,
  availableChores,
  chainId,
  addChoreToChain,
  removeChain,
  removeChoreFromChain,
}) => {
  const [choreToAdd, setChoreToAdd] = useState('');
  const handleSelect = useCallback(e => {
    const { value } = e.target;
    if (value !== '') {
      setChoreToAdd(value);
    }
  }, []);

  const handleAdd = useCallback(() => {
    addChoreToChain(availableChores.find(c => c.id === choreToAdd), chainId);
    setChoreToAdd('');
  }, [addChoreToChain, chainId, choreToAdd, availableChores]);

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
        <select value={choreToAdd} onChange={handleSelect}>
          <option value="">{PLACEHOLDER}</option>
          {availableChores.map(chore => (
            <option value={chore.id} key={chore.id}>
              {chore.name}
            </option>
          ))}
        </select>
        <button onClick={handleAdd} disabled={choreToAdd === ''}>
          +
        </button>
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
