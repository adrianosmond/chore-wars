import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from 'components/Card';
import LinkButton from 'components/LinkButton';
import UnstyledList from 'components/UnstyledList';

const ChainActionsContainer = ({ createChain, saveChains }) => {
  return (
    <Card title="Actions">
      <UnstyledList spacing="xs">
        <UnstyledList.Item>
          <LinkButton onClick={createChain}>Create a chain</LinkButton>
        </UnstyledList.Item>
        <UnstyledList.Item>
          <LinkButton onClick={saveChains}>Save chains</LinkButton>
        </UnstyledList.Item>
      </UnstyledList>
    </Card>
  );
};

export default withRouter(ChainActionsContainer);
