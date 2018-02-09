import React, { Component } from 'react'

import adrianLogo from '../../images/adrian.svg'
import dinaLogo from '../../images/dina.svg'

import './index.css'

class SelectUser extends Component {
  render() {
    return (
      <div className="select-user">
        <h1 className="select-user__title">Who are you?</h1>
        <div className="select-user__people">
          <button className="select-user__person" onClick={() => {this.props.selectUser('adrian')}}>
            <img src={adrianLogo} className="select-user__person-picture" alt="adrian" />
            <div className="select-user__person-name">Adrian</div>
          </button>
          <button className="select-user__person" onClick={() => {this.props.selectUser('dina')}}>
            <img src={dinaLogo} className="select-user__person-picture" alt="dina" />
            <div className="select-user__person-name">Dina</div>
          </button>
        </div>
      </div>
    )
  }
}

export default SelectUser
