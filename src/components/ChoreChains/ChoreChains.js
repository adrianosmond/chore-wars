import React from 'react';
import UnstyledList from 'components/UnstyledList';
import ChoreChain from 'components/ChoreChain';

const ChoreChains = ({
  chains,
  availableChores,
  addChoreToChain,
  removeChoreFromChain,
  removeChain,
}) => {
  return (
    <UnstyledList spacing="s">
      {chains.map((chain, idx) => {
        return (
          <UnstyledList.Item key={idx}>
            <ChoreChain
              chainId={idx}
              chores={chain.chores}
              availableChores={availableChores}
              addChoreToChain={addChoreToChain}
              removeChoreFromChain={removeChoreFromChain}
              removeChain={removeChain}
            />
          </UnstyledList.Item>
        );
      })}
    </UnstyledList>
  );
};

export default ChoreChains;
