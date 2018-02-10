import React, { Component } from 'react'

import { auth } from '../../lib/firebase'
import * as routes from '../../constants/routes'

import './index.css'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
}

class SelectUser extends Component {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  onSubmit(event) {
    event.preventDefault()

    console.log(this.props)

    const { email, password } = this.state
    console.log("LOGIN", email, password)
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
          <p>{this.state.error ? this.state.error : 'Please enter your username and password to log in'}</p>
          <form onSubmit={this.onSubmit.bind(this)} className="login__people">
            <label htmlFor="email" className="login__label">Email:</label>
            <input className="login__input" id="email" type="email" onChange={event => this.setState({email: event.target.value})} value={this.state.email} />
            <label htmlFor="password" className="login__label">Password:</label>
            <input className="login__input" id="password" type="password" onChange={event => this.setState({password: event.target.value})} value={this.state.password} />
            <button type="submit" className="login__button">Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default SelectUser
