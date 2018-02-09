import React, { Component } from 'react'

class SelectUser extends Component {
  render() {
    return (
      <div>
        <h1>Who are you?</h1>
        <button onClick={() => {this.props.selectUser('adrian')}}>Adrian</button>
        <button onClick={() => {this.props.selectUser('dina')}}>Dina</button>
      </div>
    )
  }
}

export default SelectUser
