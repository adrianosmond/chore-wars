import React, { useState } from 'react';
import { auth } from 'database';
import Input from 'components/Input';
import Button from 'components/Button';
import Card from 'components/Card';
import Spacer from 'components/Spacer';
import FormButtonHolder from 'components/FormButtonHolder';

const LoginContainer = () => {
  const [email, setEmail] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    auth.sendPasswordResetEmail(email).catch(err => console.error(err));
  };

  return (
    <Card title="Forgot your password">
      <Spacer as="form" onSubmit={onSubmit}>
        <Input
          type="email"
          placeholder="your.name@email.com"
          label="What is your email address?"
          value={email}
          spacing="xs"
          onChange={e => setEmail(e.target.value)}
        />
        <FormButtonHolder>
          <Button type="submit">Send password reset</Button>
        </FormButtonHolder>
      </Spacer>
    </Card>
  );
};

export default LoginContainer;
