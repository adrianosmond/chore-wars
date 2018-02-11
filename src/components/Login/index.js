import React, { Component } from 'react'

import { auth } from '../../lib/firebase'
import * as routes from '../../constants/routes'

import './index.css'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  onSubmit(event) {
    event.preventDefault()
    const { email, password } = this.state
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(routes.CHORES)
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  render() {
    return (
      <div className="login">
        <div className="login__widget">
          <h1 className="login__title">Chore Wars</h1>
          <p>{this.state.error ? this.state.error : 'Please enter your email and password to log in'}</p>
          <form onSubmit={this.onSubmit.bind(this)} className="form">
            <label htmlFor="email" className="form__label">Email:</label>
            <input className="form__input" id="email" type="email" onChange={event => this.setState({email: event.target.value})} value={this.state.email} />
            <label htmlFor="password" className="form__label">Password:</label>
            <input className="form__input" id="password" type="password" onChange={event => this.setState({password: event.target.value})} value={this.state.password} />
            <button type="submit" className="form__button">Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
