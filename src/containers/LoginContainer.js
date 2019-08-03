import React, { useState } from 'react';
import { auth } from 'database';
import Input from 'components/Input';
import Button from 'components/Button';

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
    <form onSubmit={onSubmit}>
      <p>Login</p>
      <Input
        type="email"
        placeholder="your.name@email.com"
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button type="submit">Login</Button>
    </form>
  );
};

export default LoginContainer;
