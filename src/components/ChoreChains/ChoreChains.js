import React from 'react';
import UnstyledList from 'components/UnstyledList';
import ChoreChain from 'components/ChoreChain';
import InfoPanel from 'components/InfoPanel';
import Button from 'components/Button';
import { BroomIcon } from 'components/Icon';

const ChoreChains = ({
  chains,
  createChain,
  availableChores,
  addChoreToChain,
  removeChoreFromChain,
  removeChain,
  reorderChores,
}) => {
  if (chains.length === 0) {
    return (
      <InfoPanel
        Icon={BroomIcon}
        title="Nothing to see here"
        description="You don't have any chains yet. Once you do, they will show up here. Why not go ahead and create one now?"
        cta={<Button onClick={createChain}>Create a chain</Button>}
      />
    );
  }
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
              reorderChores={reorderChores}
            />
          </UnstyledList.Item>
        );
      })}
    </UnstyledList>
  );
};

export default ChoreChains;
