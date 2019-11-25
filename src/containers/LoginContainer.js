import React, { useState } from 'react';
import { auth } from 'database';
import routes from 'constants/routes';
import useInput from 'hooks/useInput';
import useAsyncMessages from 'hooks/useAsyncMessages';
import Input from 'components/Input';
import Button from 'components/Button';
import Card from 'components/Card';
import Spacer from 'components/Spacer';
import FormButtonHolder from 'components/FormButtonHolder';
import LinkButton from 'components/LinkButton';

const LoginContainer = () => {
  const [email, updateEmail] = useInput('');
  const [password, updatePassword] = useInput('');

  const [isUpdating, setIsUpdating] = useState(false);

  const { Messages, showErrorMessage, setErrorMessage } = useAsyncMessages();

  const onSubmit = e => {
    e.preventDefault();
    setIsUpdating(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        setErrorMessage(err.message);
        showErrorMessage();
      })
      .then(() => setIsUpdating(false));
  };

  const formIsInvalid =
    email.length < 6 || !email.includes('@') || password.length === 0;

  return (
    <>
      <Messages />
      <Spacer>
        <Card title="Login">
          <Spacer as="form" onSubmit={onSubmit}>
            <Input
              type="email"
              placeholder="your.name@email.com"
              label="Email"
              value={email}
              spacing="xs"
              onChange={updateEmail}
            />
            <Input
              type="password"
              placeholder="Password"
              label="Password"
              value={password}
              spacing="xs"
              onChange={updatePassword}
            />
            <FormButtonHolder>
              <Button
                type="submit"
                disabled={formIsInvalid}
                isBusy={isUpdating}
              >
                Login
              </Button>
            </FormButtonHolder>
          </Spacer>
        </Card>
        <LinkButton to={routes.FORGOT_PASSWORD}>
          Forgot your password?
        </LinkButton>
      </Spacer>
    </>
  );
};

export default LoginContainer;
