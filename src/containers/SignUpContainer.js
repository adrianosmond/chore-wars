import React, { useState } from 'react';
import { auth } from 'database';
import Input from 'components/Input';
import Button from 'components/Button';

const isInvalid = (email, password, password2) =>
  password.length === 0 ||
  password !== password2 ||
  email.length === 0 ||
  email.indexOf('@') === -1;

const SignUpContainer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const onSubmit = e => {
    e.preventDefault();
    if (!isInvalid(email, password, password2)) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .catch(error => console.log('failed:', error.message));
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <p>Create Account</p>
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
      <Input
        type="password"
        placeholder="Password"
        label="Confirm Password"
        value={password2}
        onChange={e => setPassword2(e.target.value)}
      />
      <Button type="submit">Create Account</Button>
    </form>
  );
};

export default SignUpContainer;
