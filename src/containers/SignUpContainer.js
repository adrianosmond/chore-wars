import React from 'react';
import { auth } from 'database';
import useInput from 'hooks/useInput';
import routes from 'constants/routes';
import Input from 'components/Input';
import Button from 'components/Button';
import Card from 'components/Card';
import Spacer from 'components/Spacer';
import FormButtonHolder from 'components/FormButtonHolder';
import LinkButton from 'components/LinkButton';

const isInvalid = (email, password, password2) =>
  password.length === 0 ||
  password !== password2 ||
  email.length === 0 ||
  email.indexOf('@') === -1;

const SignUpContainer = () => {
  const [email, updateEmail] = useInput('');
  const [password, updatePassword] = useInput('');
  const [password2, updatePassword2] = useInput('');

  const onSubmit = e => {
    e.preventDefault();
    if (!isInvalid(email, password, password2)) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .catch(error => console.log('failed:', error.message));
    }
  };

  const formIsInvalid =
    email.length < 6 ||
    !email.includes('@') ||
    password.length === 0 ||
    password !== password2;

  return (
    <Spacer>
      <Card title="Create Account">
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
          <Input
            type="password"
            placeholder="Password"
            label="Confirm Password"
            value={password2}
            spacing="xs"
            onChange={updatePassword2}
          />
          <FormButtonHolder>
            <Button type="submit" disabled={formIsInvalid}>
              Create Account
            </Button>
          </FormButtonHolder>
        </Spacer>
      </Card>
      <LinkButton to={routes.LOGIN}>Already have an account?</LinkButton>
    </Spacer>
  );
};

export default SignUpContainer;
