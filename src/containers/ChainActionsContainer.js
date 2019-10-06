import React from 'react';
import { useHistory } from 'react-router-dom';
import Card from 'components/Card';
import LinkButton from 'components/LinkButton';
import UnstyledList from 'components/UnstyledList';
import routes from 'constants/routes';
import { AddIcon, SaveIcon } from 'components/Icon';

const ChainActionsContainer = ({ createChain, saveChains }) => {
  const history = useHistory();
  const saveAndRedirect = () =>
    saveChains().then(() => history.push(routes.HOME));
  return (
    <Card title="Actions">
      <UnstyledList spacing="xs">
        <UnstyledList.Item>
          <LinkButton onClick={createChain} Icon={AddIcon}>
            Create a chain
          </LinkButton>
        </UnstyledList.Item>
        <UnstyledList.Item>
          <LinkButton onClick={saveAndRedirect} Icon={SaveIcon}>
            Save chains
          </LinkButton>
        </UnstyledList.Item>
      </UnstyledList>
    </Card>
  );
};

export default ChainActionsContainer;
