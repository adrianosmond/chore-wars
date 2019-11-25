import React, { useState } from 'react';
import { auth } from 'database';
import useInput from 'hooks/useInput';
import useAsyncMessages from 'hooks/useAsyncMessages';
import Input from 'components/Input';
import Button from 'components/Button';
import Card from 'components/Card';
import Spacer from 'components/Spacer';

import FormButtonHolder from 'components/FormButtonHolder';

const LoginContainer = () => {
  const [email, updateEmail] = useInput('');

  const [isUpdating, setIsUpdating] = useState(false);
  const {
    Messages,
    showSuccessMessage,
    setSuccessMessage,
    showErrorMessage,
    setErrorMessage,
  } = useAsyncMessages();

  const onSubmit = e => {
    e.preventDefault();
    setSuccessMessage(`A password reset has been sent to ${email}`);
    setIsUpdating(true);
    auth
      .sendPasswordResetEmail(email)
      .then(() => showSuccessMessage())
      .catch(err => {
        setErrorMessage(err.message);
        showErrorMessage();
      })
      .then(() => setIsUpdating(false));
  };

  const isFormInvalid = email.length < 6 || !email.includes('@');

  return (
    <>
      <Messages />
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
            <Button type="submit" disabled={isFormInvalid} isBusy={isUpdating}>
              Send password reset
            </Button>
          </FormButtonHolder>
        </Spacer>
      </Card>
    </>
  );
};

export default LoginContainer;
