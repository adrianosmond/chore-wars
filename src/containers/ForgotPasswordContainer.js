import React, { useState } from 'react';
import { auth } from 'database';
import useInput from 'hooks/useInput';
import useToggle from 'hooks/useToggle';
import Input from 'components/Input';
import Button from 'components/Button';
import Card from 'components/Card';
import Spacer from 'components/Spacer';
import Notification from 'components/Notification';
import FormButtonHolder from 'components/FormButtonHolder';

const LoginContainer = () => {
  const [email, updateEmail] = useInput('');

  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState('');

  const [
    successMessageVisible,
    showSuccessMessage,
    hideSuccessMessage,
  ] = useToggle(false);
  const [errorMessageVisible, showErrorMessage, hideErrorMessage] = useToggle(
    false,
  );

  const onSubmit = e => {
    e.preventDefault();
    setIsUpdating(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => showSuccessMessage())
      .catch(err => {
        setError(err.message);
        showErrorMessage();
      })
      .then(() => setIsUpdating(false));
  };

  const isFormInvalid = email.length < 6 || !email.includes('@');

  return (
    <>
      {successMessageVisible && (
        <Notification closeNotification={hideSuccessMessage}>
          A password reset has been sent to {email}
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
      <Card title="Forgot your password">
        <Spacer as="form" onSubmit={onSubmit}>
          <Input
            type="email"
            placeholder="your.name@email.com"
            label="What is your email address?"
            value={email}
            spacing="xs"
            onChange={updateEmail}
          />
          <FormButtonHolder>
            <Button
              type="submit"
              disabled={isFormInvalid || isUpdating}
              isBusy={isUpdating}
            >
              Send password reset
            </Button>
          </FormButtonHolder>
        </Spacer>
      </Card>
    </>
  );
};

export default LoginContainer;
