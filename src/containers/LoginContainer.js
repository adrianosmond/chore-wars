import React, { useState } from 'react';
import { auth } from 'database';
import Input from 'components/Input';
import Button from 'components/Button';
import Card from 'components/Card';
import Typography from 'components/Typography';
import Spacer from 'components/Spacer';
import FormButtonHolder from 'components/FormButtonHolder';

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
    <Card>
      <Spacer as="form" onSubmit={onSubmit} grow>
        <Typography appearance="h3">Login</Typography>
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
  );
};

export default LoginContainer;
