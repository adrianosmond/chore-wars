import React, { Component } from 'react';
import { auth } from 'lib/firebase';
import * as routes from 'constants/routes';

const INITIAL_STATE = {
  email: '',
  password: '',
  password2: '',
};

const isInvalid = ({ email, password, password2 }) =>
  password.length === 0 ||
  password !== password2 ||
  email.length === 0 ||
  email.indexOf('@') === -1;

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) this.props.history.push(routes.NO_GAME);
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (!isInvalid(this.state)) {
      auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => this.setState({ ...INITIAL_STATE }))
        .catch(error => this.setState({ error: error.message }));
    }
  }

  render() {
    return (
      <div className="login">
        <div className="login__widget">
          <h1 className="login__title">Chore Wars</h1>
          <p className={`${this.state.error ? 'form__label--error' : ''}`}>{this.state.error ? this.state.error : 'Please fill out your details to create an account'}</p>
          <form onSubmit={this.onSubmit.bind(this)} className="form form--contained">
            <label className="form__label form__label--small" htmlFor="email">Email</label>
            <input className="form__input" id="email" placeholder="Email" type="email" onChange={event => this.setState({ email: event.target.value })} value={this.state.email} />
            <label className="form__label form__label--small" htmlFor="password">Password</label>
            <input className="form__input" id="password" placeholder="Password" type="password" onChange={event => this.setState({ password: event.target.value })} value={this.state.password} />
            <label className="form__label form__label--small" htmlFor="password2">Confirm Password</label>
            <input className="form__input" id="password2" placeholder="Password" type="password" onChange={event => this.setState({ password2: event.target.value })} value={this.state.password2} />
            <button type="submit" className="form__button" disabled={isInvalid(this.state)}>Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
