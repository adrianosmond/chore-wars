import React, { useState } from 'react';
import Card from 'components/Card';
import useToggle from 'hooks/useToggle';
import LinkButton from 'components/LinkButton';
import UnstyledList from 'components/UnstyledList';
import { AddIcon, SaveIcon } from 'components/Icon';
import Notification from 'components/Notification';

const ChainActionsContainer = ({ createChain, saveChains }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const [
    successMessageVisible,
    showSuccessMessage,
    hideSuccessMessage,
  ] = useToggle(false);

  const [errorMessageVisible, showErrorMessage, hideErrorMessage] = useToggle(
    false,
  );

  const save = () => {
    setIsUpdating(true);
    saveChains()
      .then(() => showSuccessMessage())
      .catch(() => showErrorMessage())
      .then(() => setIsUpdating(false));
  };

  return (
    <>
      {successMessageVisible && (
        <Notification closeNotification={hideSuccessMessage}>
          Chains successfully saved
        </Notification>
      )}
      {errorMessageVisible && (
        <Notification
          closeNotification={hideErrorMessage}
          appearance="error"
          hideAfter={5000}
        >
          Something went wrong. Please try again later
        </Notification>
      )}
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
