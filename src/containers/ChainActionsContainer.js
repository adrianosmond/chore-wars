import React, { useState } from 'react';
import Card from 'components/Card';
import useAsyncMessages from 'hooks/useAsyncMessages';
import LinkButton from 'components/LinkButton';
import UnstyledList from 'components/UnstyledList';
import { AddIcon, SaveIcon } from 'components/Icon';

const ChainActionsContainer = ({ createChain, saveChains }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const { Messages, showSuccessMessage, showErrorMessage } = useAsyncMessages({
    successMessage: 'Chains successfully saved',
  });

  const save = () => {
    setIsUpdating(true);
    saveChains()
      .then(() => showSuccessMessage())
      .catch(() => showErrorMessage())
      .then(() => setIsUpdating(false));
  };

  return (
    <>
      <Messages />
      <Card title="Actions">
        <UnstyledList spacing="xs">
          <UnstyledList.Item>
            <LinkButton onClick={createChain} Icon={AddIcon}>
              Create a chain
            </LinkButton>
          </UnstyledList.Item>
          <UnstyledList.Item>
            <LinkButton onClick={save} Icon={SaveIcon} isBusy={isUpdating}>
              Save chains
            </LinkButton>
          </UnstyledList.Item>
        </UnstyledList>
      </Card>
    </>
  );
};

export default ChainActionsContainer;
