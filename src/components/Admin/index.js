import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as routes from '../../constants/routes'

class Admin extends Component {
  render() {
    return (
      <div className="admin">
        <Link to={routes.NEW_CHORE} className="form__button form__button--secondary">Add a chore</Link>
      </div>
    )
  }
}

export default Admin
