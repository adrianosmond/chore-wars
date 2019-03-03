import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { auth } from 'utils/database';
import * as routes from 'constants/routes';

import './LoginForm.css';

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LoginForm extends Component {
  state = INITIAL_STATE;

  static propTypes = {
    loggedIn: PropTypes.func.isRequired,
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    const { loggedIn } = this.props;
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        loggedIn();
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  render() {
    const { error, email, password } = this.state;
    return (
      <div className="login">
        <div className="login__widget">
          <h1 className="login__title">Chore Wars</h1>
          <p>{error || 'Please enter your email and password to log in'}</p>
          <form onSubmit={this.onSubmit} className="form form--contained">
            <label className="form__label form__label--small" htmlFor="email">Email</label>
            <input
              className="form__input"
              id="email"
              placeholder="Email"
              type="email"
              onChange={event => this.setState({ email: event.target.value })}
              value={email}
            />
            <label className="form__label form__label--small" htmlFor="password">Password</label>
            <input
              className="form__input"
              id="password"
              placeholder="Password"
              type="password"
              onChange={event => this.setState({ password: event.target.value })}
              value={password}
            />
            <button type="submit" className="form__button">Login</button>
          </form>
          <p className="login__link">
            <Link to={routes.SIGN_UP}>Create an account</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default LoginForm;
