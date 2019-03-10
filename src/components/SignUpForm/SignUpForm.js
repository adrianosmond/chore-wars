import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import InputWithLabel from 'components/InputWithLabel';

const isInvalid = (email, password, password2) => (
  password.length === 0
  || password !== password2
  || email.length === 0
  || email.indexOf('@') === -1
);

const SignUpForm = ({ onSubmit, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const buttonDisabled = isInvalid(email, password, password2);

  const submitForm = (evt) => {
    evt.preventDefault();
    if (!isInvalid(email, password, password2)) {
      onSubmit(email, password);
    }
  };

  return (
    <div className="login">
      <div className="login__widget">
        <h1 className="login__title">Chore Wars</h1>
        <p className={`${error ? 'form__label--error' : ''}`}>
          {error || 'Please fill out your details to create an account'}
        </p>
        <form onSubmit={submitForm} className="form form--contained">
          <InputWithLabel
            labelVariant="small"
            labelText="Email"
            id="email"
            placeholder="Email"
            type="email"
            onChange={event => setEmail(event.target.value)}
            value={email}
          />
          <InputWithLabel
            labelVariant="small"
            labelText="Password"
            id="password"
            placeholder="Password"
            type="password"
            onChange={event => setPassword(event.target.value)}
            value={password}
          />
          <InputWithLabel
            labelVariant="small"
            labelText="Confirm Password"
            id="password2"
            placeholder="Password"
            type="password"
            onChange={event => setPassword2(event.target.value)}
            value={password2}
          />
          <Button type="submit" disabled={buttonDisabled}>Sign Up</Button>
        </form>
      </div>
    </div>
  );
};

SignUpForm.propTypes = {
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onSubmit: PropTypes.func.isRequired,
};

SignUpForm.defaultProps = {
  error: false,
};

export default SignUpForm;
