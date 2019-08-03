import React, { useCallback } from 'react';
import Card from 'components/Card';
import LinkButton from 'components/LinkButton';
import UnstyledList from 'components/UnstyledList';

const ChainActionsContainer = ({ createChain, saveChains, chains }) => {
  const saveChainsAndGoHome = useCallback(() => {
    saveChains().then(() => console.log('TODO: Redirect home'));
  }, [saveChains]);

  return (
    <Card title="Actions">
      <UnstyledList spacing="xs">
        <UnstyledList.Item>
          <LinkButton onClick={createChain}>Create a chain</LinkButton>
        </UnstyledList.Item>
        {chains.length > 0 && (
          <UnstyledList.Item>
            <LinkButton onClick={saveChainsAndGoHome}>Save chains</LinkButton>
          </UnstyledList.Item>
        )}
      </UnstyledList>
    </Card>
  );
};

export default ChainActionsContainer;
