import React from 'react';
import useChain from 'hooks/useChain';
import ChainActionsContainer from 'containers/ChainActionsContainer';
import Layout from 'components/Layout';
import Typography from 'components/Typography';
import ChoreChains from 'components/ChoreChains';

const ChoreChainPage = () => {
  const {
    addChoreToChain,
    removeChain,
    removeChoreFromChain,
    createChain,
    saveChains,
    chains,
    availableChores,
    reorderChores,
  } = useChain();

  return (
    <Layout
      primary={
        <>
          <Typography appearance="h1" as="h1">
            Manage Chains
          </Typography>
          <ChoreChains
            chains={chains}
            createChain={createChain}
            availableChores={availableChores}
            addChoreToChain={addChoreToChain}
            removeChoreFromChain={removeChoreFromChain}
            removeChain={removeChain}
            reorderChores={reorderChores}
          />
        </>
      }
      secondary={
        <ChainActionsContainer
          createChain={createChain}
          saveChains={saveChains}
        />
      }
    />
  );
};

export default ChoreChainPage;
