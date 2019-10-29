import React, { useState } from 'react';
import { auth } from 'database';
import routes from 'constants/routes';
import Input from 'components/Input';
import Button from 'components/Button';
import Card from 'components/Card';
import Spacer from 'components/Spacer';
import FormButtonHolder from 'components/FormButtonHolder';
import LinkButton from 'components/LinkButton';

const LoginContainer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(err => console.error(err));
  };

  return (
    <Spacer>
      <Card title="Login">
        <Spacer as="form" onSubmit={onSubmit}>
          <Input
            type="email"
            placeholder="your.name@email.com"
            label="Email"
            value={email}
            spacing="xs"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            label="Password"
            value={password}
            spacing="xs"
            onChange={e => setPassword(e.target.value)}
          />
          <FormButtonHolder>
            <Button type="submit">Login</Button>
          </FormButtonHolder>
        </Spacer>
      </Card>
      <LinkButton to={routes.FORGOT_PASSWORD}>Forgot your password?</LinkButton>
    </Spacer>
  );
};

export default LoginContainer;
