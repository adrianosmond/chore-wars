import React, { useState } from 'react';
import Card from 'components/Card';
import useAsyncMessages from 'hooks/useAsyncMessages';
import LinkButton from 'components/LinkButton';
import UnstyledList from 'components/UnstyledList';
import { AddIcon, SaveIcon } from 'components/Icon';

const ChainActionsContainer = ({ createChain, saveChains }) => {
  const [isBusy, setIsBusy] = useState(false);

  const { Messages, showSuccessMessage, showErrorMessage } = useAsyncMessages({
    successMessage: 'Chains successfully saved',
  });

  const save = () => {
    setIsBusy(true);
    saveChains()
      .then(() => showSuccessMessage())
      .catch(() => showErrorMessage())
      .then(() => setIsBusy(false));
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
            <LinkButton onClick={save} Icon={SaveIcon} isBusy={isBusy}>
              Save chains
            </LinkButton>
          </UnstyledList.Item>
        </UnstyledList>
      </Card>
    </>
  );
};

export default ChainActionsContainer;
