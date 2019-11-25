import React, { useState, useMemo } from 'react';
import useToggle from 'hooks/useToggle';
import Notification from 'components/Notification';

export default ({
  successMessage = 'Done!',
  errorMessage = 'Something went wrong. Please try again later',
} = {}) => {
  const [success, setSuccessMessage] = useState(successMessage);
  const [error, setErrorMessage] = useState(errorMessage);

  const [
    successMessageVisible,
    showSuccessMessage,
    hideSuccessMessage,
  ] = useToggle(false);
  const [errorMessageVisible, showErrorMessage, hideErrorMessage] = useToggle(
    false,
  );

  const Messages = useMemo(
    () => () => (
      <>
        {successMessageVisible && (
          <Notification closeNotification={hideSuccessMessage}>
            {success}
          </Notification>
        )}
        {errorMessageVisible && (
          <Notification
            closeNotification={hideErrorMessage}
            appearance="error"
            hideAfter={5000}
          >
            {error}
          </Notification>
        )}
      </>
    ),
    [
      error,
      errorMessageVisible,
      hideErrorMessage,
      hideSuccessMessage,
      success,
      successMessageVisible,
    ],
  );

  return {
    Messages,
    showSuccessMessage,
    setSuccessMessage,
    showErrorMessage,
    setErrorMessage,
  };
};
