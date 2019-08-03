import React, { useState, useCallback } from 'react';
import classes from './ChoreChain.module.css';

const PLACEHOLDER = 'Please select a chore';

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
    <div className={classes.chain}>
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
        <button onClick={handleRemoveChain}>x</button>
      </div>
      <div>
        {chores.map(chore => (
          <div key={chore.id}>
            {chore.name}
            <button onClick={() => handleRemove(chore.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ChoreChain;
