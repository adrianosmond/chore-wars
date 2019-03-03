import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { auth } from 'utils/database';
import * as routes from 'constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
  password2: '',
};

const isInvalid = ({ email, password, password2 }) => password.length === 0
  || password !== password2
  || email.length === 0
  || email.indexOf('@') === -1;

class SignUp extends Component {
  state = INITIAL_STATE

  static propTypes = {
    history: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  componentDidMount() {
    const { history } = this.props;
    auth.onAuthStateChanged((authUser) => {
      if (authUser) history.push(routes.NO_GAME);
    });
  }

  onSubmit = (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    if (!isInvalid(this.state)) {
      auth.createUserWithEmailAndPassword(email, password)
        .then(() => this.setState({ ...INITIAL_STATE }))
        .catch(error => this.setState({ error: error.message }));
    }
  }

  render() {
    const {
      error, email, password, password2,
    } = this.state;
    return (
      <div className="login">
        <div className="login__widget">
          <h1 className="login__title">Chore Wars</h1>
          <p className={`${error ? 'form__label--error' : ''}`}>{error || 'Please fill out your details to create an account'}</p>
          <form onSubmit={this.onSubmit} className="form form--contained">
            <label className="form__label form__label--small" htmlFor="email">Email</label>
            <input className="form__input" id="email" placeholder="Email" type="email" onChange={event => this.setState({ email: event.target.value })} value={email} />
            <label className="form__label form__label--small" htmlFor="password">Password</label>
            <input className="form__input" id="password" placeholder="Password" type="password" onChange={event => this.setState({ password: event.target.value })} value={password} />
            <label className="form__label form__label--small" htmlFor="password2">Confirm Password</label>
            <input className="form__input" id="password2" placeholder="Password" type="password" onChange={event => this.setState({ password2: event.target.value })} value={password2} />
            <button type="submit" className="form__button" disabled={isInvalid(this.state)}>Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
